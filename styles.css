:root {
  --bg: #0b0e12;
  --panel: #12161c;
  --panel-2: #161b22;
  --text: #e6edf3;
  --muted: #8b949e;
  --primary: #2f81f7;
  --danger: #ff6b6b;
  --accent: #7ee787;
  --border: #30363d;
}
* { box-sizing: border-box; }
html, body { height: 100%; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid var(--border);
  background: var(--panel);
  position: sticky;
  top: 0;
  z-index: 5;
}
.brand { display: flex; align-items: center; gap: 12px; }
.app-logo {
   height: 32px;
   width: auto;
   display: block;
 }
 .app-logo-fallback {
   width: 32px;
   height: 32px;
   background: var(--primary);
   color: #fff;
   border-radius: 6px;
   display: none;
   place-items: center;
 }
.brand-text .name { font-weight: 700; }
.brand-text .link { color: var(--muted); text-decoration: none; font-size: 12px; }
.header-actions { display: flex; gap: 8px; align-items: center; }
.btn, .select, input, textarea, select {
  background: var(--panel-2);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
}
.btn { cursor: pointer; }
.btn.primary { background: var(--primary); border-color: transparent; }
.btn.secondary { background: #1f6feb; }
.btn.danger { background: var(--danger); border-color: transparent; }
.btn:disabled { opacity: .6; cursor: not-allowed; }
.select { padding-right: 28px; }
.app-main { display: grid; grid-template-columns: 280px 1fr; gap: 0; min-height: calc(100vh - 60px); }
.sidebar {
  border-right: 1px solid var(--border);
  background: var(--panel);
  display: flex; flex-direction: column;
}
.sidebar-header {
  padding: 12px 16px; font-weight: 600; border-bottom: 1px solid var(--border);
}
.invoice-list { overflow: auto; flex-grow: 1; }
.invoice-list:empty::after {
  content: "No invoices found";
  display: block;
  padding: 40px 20px;
  text-align: center;
  color: var(--muted);
  font-size: 14px;
}
.invoice-item {
  display: grid; grid-template-columns: 1fr auto; align-items: center;
  padding: 16px; border-bottom: 1px solid var(--border); gap: 12px;
  cursor: pointer; transition: background 0.2s;
}
.invoice-item:hover { background: #1c2128; }
.invoice-item.active { background: #1c2128; border-left: 4px solid var(--primary); padding-left: 12px; }
.invoice-item .title { font-weight: 600; font-size: 15px; margin-bottom: 4px; }
.invoice-item .meta { font-size: 13px; color: var(--muted); }
.invoice-item .status {
  padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.invoice-item .status.paid { background: rgba(63, 185, 80, 0.15); color: #56d364; border: 1px solid rgba(63, 185, 80, 0.3); }
.invoice-item .status.unpaid { background: rgba(248, 81, 73, 0.15); color: #ff7b72; border: 1px solid rgba(248, 81, 73, 0.3); }

.editor { display: grid; grid-template-columns: 580px 1fr; height: 100%; overflow: hidden; }
.editor-form { padding: 24px; border-right: 1px solid var(--border); background: var(--panel); overflow-y: auto; height: 100%; }
.form-row { display: flex; gap: 16px; margin-bottom: 16px; }
.field { display: flex; flex-direction: column; gap: 8px; flex: 1; }
.field label { font-size: 13px; font-weight: 600; color: var(--muted); }
.field input, .field select, .field textarea { 
  width: 100%; padding: 10px 12px; font-size: 14px; 
  transition: border-color 0.2s, box-shadow 0.2s;
}
.field input:focus, .field select:focus, .field textarea:focus {
  border-color: var(--primary); outline: none; box-shadow: 0 0 0 3px rgba(47, 129, 247, 0.15);
}

.items-header { display: flex; justify-content: space-between; align-items: center; margin: 24px 0 12px; padding-top: 24px; border-top: 1px solid var(--border); }
.items-header div { font-weight: 700; font-size: 16px; }
.items { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
.item-row { display: grid; grid-template-columns: 1fr 70px 110px 40px; gap: 12px; align-items: start; }
.remove-item { 
  background: transparent; border: 1px solid var(--border); color: var(--danger); 
  padding: 8px; height: 38px; display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.remove-item:hover { background: rgba(248, 81, 73, 0.1); border-color: var(--danger); }

#addItemBtn { 
  background: rgba(47, 129, 247, 0.1); 
  color: var(--primary); 
  border-color: rgba(47, 129, 247, 0.3);
  font-weight: 600;
  padding: 6px 12px;
}
#addItemBtn:hover {
  background: var(--primary);
  color: #fff;
}
.editor-actions { 
  display: flex; gap: 12px; margin-top: 32px; padding-top: 24px; 
  border-top: 1px solid var(--border); position: sticky; bottom: 0; background: var(--panel); padding-bottom: 12px;
}
.editor-actions .btn { flex: 1; justify-content: center; font-weight: 600; padding: 12px; }

.preview-wrapper { 
  background: #0d1117; 
  padding: 60px; 
  overflow: auto; 
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
}
/* Better scaling using transform */
#invoicePreview {
  transform: scale(0.75);
  transform-origin: top center;
  margin-bottom: -100px; /* Offset the scale empty space */
}

.invoice {
  background: #fff;
  color: #111;
  width: 794px; /* Fixed width for better capture ~210mm */
  min-height: 1123px; /* ~297mm */
  margin: 0;
  padding: 0;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  overflow: hidden;
  position: relative;
  border-radius: 4px;
}
.watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  font-size: 120px;
  font-weight: 900;
  text-transform: uppercase;
  pointer-events: none;
  z-index: 10;
  white-space: nowrap;
  letter-spacing: 10px;
  width: 100%;
  text-align: center;
}
.watermark.paid { color: rgba(45, 164, 78, 0.15); }
.watermark.unpaid { color: rgba(207, 34, 46, 0.15); }
@media print {
  @page { 
    margin: 0; 
    size: A4; 
  }
  html, body {
    margin: 0;
    padding: 0;
    background: #fff !important;
  }
  .app-header, .sidebar, .editor-form, .editor-actions, .preview-wrapper > *:not(#invoicePreview) { 
    display: none !important; 
  }
  .app-main { 
    display: block !important; 
    padding: 0 !important;
    margin: 0 !important;
  }
  .editor { 
    display: block !important; 
    padding: 0 !important;
    margin: 0 !important;
  }
  .preview-wrapper { 
    padding: 0 !important; 
    margin: 0 !important;
    background: #fff !important; 
    display: block !important;
    height: auto !important;
    overflow: visible !important;
  }
  #invoicePreview { 
    transform: none !important; 
    margin: 0 !important;
    box-shadow: none !important;
    width: 100% !important;
    border-radius: 0 !important;
    min-height: 0 !important;
  }
  .invoice {
    border: none !important;
  }
}
.invoice-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  padding: 40px; background: #f8f9fa; border-bottom: 1px solid #eee;
}
.company-name { font-size: 28px; font-weight: 800; color: #111; line-height: 1; margin-bottom: 4px; }
.company-contact { color: #666; font-size: 13px; }
.invoice-meta { min-width: 200px; }
.meta-row { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(0,0,0,0.05); }
.meta-row:last-child { border-bottom: none; }
.billto { display: flex; justify-content: space-between; padding: 40px; gap: 40px; }
.billto > div { flex: 1; }
.billto .right { text-align: right; }
.label { font-size: 11px; color: #888; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 4px; }
.bold { font-weight: 700; color: #111; font-size: 15px; }
.items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
.items-table th, .items-table td { padding: 12px 40px; text-align: left; border-bottom: 1px solid #eee; }
.items-table th { background: #f8f9fa; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; }
.items-table td:last-child, .items-table th:last-child { text-align: right; }
.items-table tfoot td { padding: 12px 40px; text-align: right; border-bottom: none; }
.items-table tfoot tr:first-child td { padding-top: 30px; }
.total-row td { font-size: 20px; font-weight: 800; color: var(--primary); }
.notes { padding: 40px; border-top: 1px solid #eee; margin-top: auto; }
@media (max-width: 1200px) {
  .app-main { grid-template-columns: 1fr; }
  .editor { grid-template-columns: 1fr; }
  .invoice { width: 100%; }
}
