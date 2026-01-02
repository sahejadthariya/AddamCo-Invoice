const els = {
  list: document.getElementById('invoiceList'),
  filterStatus: document.getElementById('filterStatus'),
  newBtn: document.getElementById('newInvoiceBtn'),
  invNumber: document.getElementById('invNumber'),
  invDate: document.getElementById('invDate'),
  dueDate: document.getElementById('dueDate'),
  clientType: document.getElementById('clientType'),
  currency: document.getElementById('currency'),
  taxRate: document.getElementById('taxRate'),
  clientName: document.getElementById('clientName'),
  clientEmail: document.getElementById('clientEmail'),
  clientPhone: document.getElementById('clientPhone'),
  clientAddress: document.getElementById('clientAddress'),
  taxIdLabel: document.getElementById('taxIdLabel'),
  taxId: document.getElementById('taxId'),
  addItemBtn: document.getElementById('addItemBtn'),
  itemsContainer: document.getElementById('itemsContainer'),
  notes: document.getElementById('notes'),
  status: document.getElementById('status'),
  discount: document.getElementById('discount'),
  discountType: document.getElementById('discountType'),
  saveBtn: document.getElementById('saveInvoiceBtn'),
  markPaidBtn: document.getElementById('markPaidBtn'),
  deleteBtn: document.getElementById('deleteInvoiceBtn'),
  downloadPdfBtn: document.getElementById('downloadPdfBtn'),
  pInvNumber: document.getElementById('pInvNumber'),
  pInvDate: document.getElementById('pInvDate'),
  pDueDate: document.getElementById('pDueDate'),
  pStatus: document.getElementById('pStatus'),
  pClientName: document.getElementById('pClientName'),
  pClientEmail: document.getElementById('pClientEmail'),
  pClientPhone: document.getElementById('pClientPhone'),
  pClientAddress: document.getElementById('pClientAddress'),
  pTaxId: document.getElementById('pTaxId'),
  pCurrency: document.getElementById('pCurrency'),
  pClientType: document.getElementById('pClientType'),
  pItemsBody: document.getElementById('pItemsBody'),
  pSubtotal: document.getElementById('pSubtotal'),
  pDiscount: document.getElementById('pDiscount'),
  pDiscountRow: document.getElementById('pDiscountRow'),
  pTax: document.getElementById('pTax'),
  pTotal: document.getElementById('pTotal'),
  pNotes: document.getElementById('pNotes'),
  preview: document.getElementById('invoicePreview'),
  formTaxAmount: document.getElementById('formTaxAmount')
};
let invoices = [];
let currentId = null;
function uid() {
  return 'inv_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}
function nf(currency) {
  const locale = currency === 'INR' ? 'en-IN' : 'en-US';
  return new Intl.NumberFormat(locale, { style: 'currency', currency, currencyDisplay: 'symbol', maximumFractionDigits: 2 });
}
function saveAll() {
  localStorage.setItem('addamco_invoices', JSON.stringify(invoices));
}
function loadAll() {
  const raw = localStorage.getItem('addamco_invoices');
  invoices = raw ? JSON.parse(raw) : [];
}
function setDefaultsByClientType() {
  if (els.clientType.value === 'IN') {
    els.taxIdLabel.textContent = 'GSTIN';
    els.currency.value = 'INR';
    if (!els.taxRate.value || els.taxRate.value === '0') els.taxRate.value = '18';
  } else {
    els.taxIdLabel.textContent = 'Tax ID';
    els.currency.value = 'USD';
    if (!els.taxRate.value || els.taxRate.value === '18') els.taxRate.value = '0';
  }
}
function renderList() {
  const f = els.filterStatus.value;
  els.list.innerHTML = '';
  invoices.filter(i => f === 'all' ? true : i.status === f).sort((a,b)=>new Date(b.date)-new Date(a.date)).forEach(i => {
    const item = document.createElement('div');
    item.className = 'invoice-item';
    item.dataset.id = i.id;
    if (currentId === i.id) item.classList.add('active');
    const left = document.createElement('div');
    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = i.number || '(no number)';
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = `${i.clientName || 'Client'} • ${fmt(i.currency, sumTotal(i))} • ${i.date || ''}`;
    left.appendChild(title);
    left.appendChild(meta);
    const right = document.createElement('div');
    const status = document.createElement('div');
    status.className = 'status ' + (i.status || 'unpaid');
    status.textContent = (i.status || 'unpaid').toUpperCase();
    right.appendChild(status);
    item.appendChild(left);
    item.appendChild(right);
    item.onclick = () => openInvoice(i.id);
    els.list.appendChild(item);
  });
}
function fmt(currency, value) {
  return nf(currency || 'INR').format(value || 0);
}
function sumSubtotal(i) {
  return (i.items || []).reduce((acc, it) => acc + (Number(it.qty || 0) * Number(it.price || 0)), 0);
}
function sumDiscount(i) {
  const sub = sumSubtotal(i);
  if (i.discountType === 'percent') {
    return sub * (Number(i.discount || 0) / 100);
  }
  return Number(i.discount || 0);
}
function sumTax(i) {
  const afterDiscount = sumSubtotal(i) - sumDiscount(i);
  return afterDiscount * Number(i.taxRate || 0) / 100;
}
function sumTotal(i) {
  return sumSubtotal(i) - sumDiscount(i) + sumTax(i);
}
function bindPreview(i) {
  els.pInvNumber.textContent = i.number || '';
  els.pInvDate.textContent = i.date || '';
  els.pDueDate.textContent = i.dueDate || '';
  els.pStatus.textContent = (i.status || 'unpaid').toUpperCase();
  els.pClientName.textContent = i.clientName || '';
  els.pClientEmail.textContent = i.clientEmail || '';
  els.pClientPhone.textContent = i.clientPhone || '';
  els.pClientAddress.textContent = i.clientAddress || '';
  const taxLabel = i.clientType === 'IN' ? 'GSTIN' : 'Tax ID';
  els.pTaxId.textContent = i.taxId ? (taxLabel + ': ' + i.taxId) : '';
  els.pCurrency.textContent = i.currency || '';
  els.pClientType.textContent = i.clientType === 'IN' ? 'India' : 'United States';
  els.pItemsBody.innerHTML = '';
  (i.items || []).forEach(it => {
    const tr = document.createElement('tr');
    const tdDesc = document.createElement('td');
    tdDesc.textContent = it.desc || '';
    const tdQty = document.createElement('td');
    tdQty.textContent = it.qty || 0;
    const tdPrice = document.createElement('td');
    tdPrice.textContent = fmt(i.currency, Number(it.price || 0));
    const tdAmt = document.createElement('td');
    tdAmt.textContent = fmt(i.currency, Number(it.qty || 0) * Number(it.price || 0));
    tr.appendChild(tdDesc);
    tr.appendChild(tdQty);
    tr.appendChild(tdPrice);
    tr.appendChild(tdAmt);
    els.pItemsBody.appendChild(tr);
  });
  els.pSubtotal.textContent = fmt(i.currency, sumSubtotal(i));
  
  const discVal = sumDiscount(i);
  if (discVal > 0) {
    els.pDiscountRow.style.display = 'table-row';
    els.pDiscount.textContent = '-' + fmt(i.currency, discVal);
  } else {
    els.pDiscountRow.style.display = 'none';
  }

  els.pTax.textContent = fmt(i.currency, sumTax(i));
  els.pTotal.textContent = fmt(i.currency, sumTotal(i));
  els.pNotes.textContent = i.notes || '';

  if (els.formTaxAmount) {
    els.formTaxAmount.textContent = `(${fmt(i.currency, sumTax(i))})`;
  }
}
function readForm() {
  const data = {
    id: currentId || uid(),
    number: els.invNumber.value.trim(),
    date: els.invDate.value,
    dueDate: els.dueDate.value,
    clientType: els.clientType.value,
    currency: els.currency.value,
    taxRate: Number(els.taxRate.value || 0),
    clientName: els.clientName.value.trim(),
    clientEmail: els.clientEmail.value.trim(),
    clientPhone: els.clientPhone.value.trim(),
    clientAddress: els.clientAddress.value.trim(),
    taxId: els.taxId.value.trim(),
    notes: els.notes.value.trim(),
    status: els.status.value,
    discount: Number(els.discount.value || 0),
    discountType: els.discountType.value,
    items: readItems()
  };
  return data;
}
function readItems() {
  const rows = Array.from(els.itemsContainer.querySelectorAll('.item-row'));
  return rows.map(r => ({
    desc: r.querySelector('input[data-key="desc"]').value.trim(),
    qty: Number(r.querySelector('input[data-key="qty"]').value || 0),
    price: Number(r.querySelector('input[data-key="price"]').value || 0)
  }));
}
function writeForm(i) {
  els.invNumber.value = i.number || '';
  els.invDate.value = i.date || '';
  els.dueDate.value = i.dueDate || '';
  els.clientType.value = i.clientType || 'IN';
  els.currency.value = i.currency || (i.clientType === 'US' ? 'USD' : 'INR');
  els.taxRate.value = i.taxRate != null ? i.taxRate : (i.clientType === 'US' ? 0 : 18);
  els.clientName.value = i.clientName || '';
  els.clientEmail.value = i.clientEmail || '';
  els.clientPhone.value = i.clientPhone || '';
  els.clientAddress.value = i.clientAddress || '';
  els.taxId.value = i.taxId || '';
  els.notes.value = i.notes || '';
  els.status.value = i.status || 'unpaid';
  els.discount.value = i.discount || 0;
  els.discountType.value = i.discountType || 'fixed';
  setDefaultsByClientType();
  els.itemsContainer.innerHTML = '';
  (i.items && i.items.length ? i.items : [{ desc: '', qty: 1, price: 0 }]).forEach(addItemRow);
  bindPreview(i);
  
  // Disable Mark Paid if already paid
  els.markPaidBtn.disabled = i.status === 'paid';
}
function newInvoice() {
  currentId = null;
  const today = new Date().toISOString().slice(0,10);
  const d = {
    id: uid(),
    number: nextNumber(),
    date: today,
    dueDate: today,
    clientType: 'IN',
    currency: 'INR',
    taxRate: 18,
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    taxId: '',
    notes: '',
    status: 'unpaid',
    discount: 0,
    discountType: 'fixed',
    items: [{ desc: '', qty: 1, price: 0 }]
  };
  writeForm(d);
}
function nextNumber() {
  const base = 'INV-';
  const nums = invoices.map(i => i.number).filter(Boolean).map(s => Number(String(s).split('-').pop())).filter(n => !isNaN(n));
  const next = (nums.length ? Math.max(...nums) + 1 : 1).toString().padStart(4, '0');
  return base + next;
}
function addItemRow(it) {
  const row = document.createElement('div');
  row.className = 'item-row';
  const desc = document.createElement('input');
  desc.placeholder = 'Description';
  desc.dataset.key = 'desc';
  desc.value = it.desc || '';
  const qty = document.createElement('input');
  qty.type = 'number';
  qty.step = '1';
  qty.placeholder = 'Qty';
  qty.dataset.key = 'qty';
  qty.value = it.qty != null ? it.qty : 1;
  const price = document.createElement('input');
  price.type = 'number';
  price.step = '0.01';
  price.placeholder = 'Unit Price';
  price.dataset.key = 'price';
  price.value = it.price != null ? it.price : 0;
  const remove = document.createElement('button');
  remove.className = 'btn remove-item';
  remove.title = 'Remove item';
  remove.innerHTML = '&times;';
  remove.onclick = () => {
    row.remove();
    syncPreviewFromForm();
  };
  [desc, qty, price].forEach(el => el.addEventListener('input', syncPreviewFromForm));
  row.appendChild(desc);
  row.appendChild(qty);
  row.appendChild(price);
  row.appendChild(remove);
  els.itemsContainer.appendChild(row);
  
  // Autofocus description for new rows
  if (!it.desc) desc.focus();
}
function openInvoice(id) {
  const i = invoices.find(x => x.id === id);
  if (!i) return;
  currentId = id;
  writeForm(i);
}
function upsertInvoice() {
  const data = readForm();
  if (!data.number) { alert('Invoice number is required'); return; }
  const idx = invoices.findIndex(i => i.id === data.id);
  if (idx >= 0) invoices[idx] = data; else invoices.push(data);
  currentId = data.id;
  saveAll();
  renderList();
  showNotify('Invoice saved');
}
function markPaid() {
  els.status.value = 'paid';
  upsertInvoice();
}
function deleteInvoice() {
  if (!currentId) return;
  if (!confirm('Delete this invoice?')) return;
  invoices = invoices.filter(i => i.id !== currentId);
  saveAll();
  currentId = null;
  newInvoice();
  renderList();
  showNotify('Invoice deleted');
}
function showNotify(msg) {
  const n = document.createElement('div');
  n.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--primary);color:#fff;padding:10px 20px;border-radius:8px;z-index:100;box-shadow:0 4px 12px rgba(0,0,0,0.3);font-weight:600;animation:slideIn 0.3s ease-out;';
  n.textContent = msg;
  document.body.appendChild(n);
  setTimeout(() => {
    n.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => n.remove(), 300);
  }, 2000);
}
function syncPreviewFromForm() {
  bindPreview(readForm());
}
function downloadPdf() {
  const data = readForm();
  bindPreview(data);
  
  const element = els.preview;
  // Temporarily reset transform for capture
  const oldTransform = element.style.transform;
  const oldMarginBottom = element.style.marginBottom;
  element.style.transform = 'none';
  element.style.marginBottom = '0';
  const oldBoxShadow = element.style.boxShadow;
  element.style.boxShadow = 'none';

  const opt = {
    margin: 0,
    filename: (data.number || 'invoice') + '.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      letterRendering: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).toPdf().get('pdf').then(function (pdf) {
    element.style.transform = oldTransform;
    element.style.marginBottom = oldMarginBottom;
    element.style.boxShadow = oldBoxShadow;
  }).save();
}
function bindEvents() {
  els.newBtn.onclick = () => {
    newInvoice();
    els.invNumber.focus();
  };
  els.filterStatus.onchange = renderList;
  els.addItemBtn.onclick = () => {
    addItemRow({ desc: '', qty: 1, price: 0 });
  };
  els.saveBtn.onclick = upsertInvoice;
  els.markPaidBtn.onclick = markPaid;
  els.deleteBtn.onclick = deleteInvoice;
  els.downloadPdfBtn.onclick = downloadPdf;
  [
    els.invNumber, els.invDate, els.dueDate, els.clientType, els.currency, els.taxRate,
    els.clientName, els.clientEmail, els.clientPhone, els.clientAddress, els.taxId,
    els.notes, els.status, els.discount, els.discountType
  ].forEach(el => el.addEventListener('input', syncPreviewFromForm));
  els.clientType.addEventListener('change', () => {
    setDefaultsByClientType();
    syncPreviewFromForm();
  });
}
function bootstrap() {
  loadAll();
  renderList();
  bindEvents();
  newInvoice();
}
document.addEventListener('DOMContentLoaded', bootstrap);
