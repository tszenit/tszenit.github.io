/* TS Zenit · entrega de PDF y material en cualquier dispositivo.
   En iPhone, Android y navegadores dentro de apps, una descarga lanzada después de
   descifrar (ya sin el toque del usuario) se bloquea en silencio. Aquí, en pantallas
   táctiles, el archivo se prepara y se muestra una hoja con botones reales: cada
   botón es un toque nuevo del usuario, así que el navegador sí lo deja descargar,
   abrir o compartir. En computador se mantiene la descarga directa. */
(function () {
  "use strict";
  var UA = navigator.userAgent || "";
  var IOS = /iP(hone|od|ad)/.test(UA) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var INAPP = /FBAN|FBAV|FB_IAB|Instagram|Line\/|Twitter|Snapchat|TikTok|musical_ly|BytedanceWebview|GSA\/|; wv\)/i.test(UA);
  var TACTIL = IOS || /Android/i.test(UA) || INAPP || !!(window.matchMedia && matchMedia("(hover: none) and (pointer: coarse)").matches);

  var CSS = ".tszE{position:fixed;inset:0;z-index:9999;background:rgba(3,8,18,.72);display:flex;align-items:flex-end;justify-content:center;padding:12px;padding-bottom:max(12px,env(safe-area-inset-bottom,0px))}" +
    ".tszE[hidden]{display:none}" +
    ".tszE-p{width:min(440px,100%);background:#11264B;color:#F2F4F9;border:1px solid #2A4775;border-radius:20px;padding:20px 18px 18px;box-shadow:0 20px 60px rgba(0,0,0,.5);font-family:var(--f-display,system-ui,-apple-system,\"Segoe UI\",sans-serif)}" +
    "@media (min-width:700px){.tszE{align-items:center}}" +
    ".tszE-h{display:flex;align-items:flex-start;gap:10px;margin-bottom:14px}.tszE-h div{flex:1;min-width:0}" +
    ".tszE-h b{display:block;font-size:18px;line-height:1.25}.tszE-h small{display:block;margin-top:3px;color:#B7C3DA;font-size:13px;word-break:break-all}" +
    ".tszE-x{background:none;border:0;color:#B7C3DA;font-size:28px;line-height:1;padding:0 4px;cursor:pointer;min-width:40px;min-height:40px}" +
    ".tszE-b{display:flex;width:100%;align-items:center;justify-content:center;gap:8px;min-height:50px;margin-top:10px;border-radius:14px;border:1px solid #2A4775;background:#17315C;color:#F2F4F9;font-family:inherit;font-weight:600;font-size:16px;line-height:1.2;text-decoration:none;cursor:pointer;-webkit-tap-highlight-color:transparent}" +
    ".tszE-b.p{background:#F5A524;border-color:#F5A524;color:#0B1A33}" +
    ".tszE-n{margin:14px 2px 0;color:#B7C3DA;font-size:13.5px;line-height:1.45}.tszE-n b{color:#F2C46D}" +
    ".tszV{position:fixed;inset:0;z-index:9998;background:#05070B;display:flex;flex-direction:column;font-family:var(--f-display,system-ui,-apple-system,\"Segoe UI\",sans-serif)}.tszV[hidden]{display:none}" +
    ".tszV-t{display:flex;align-items:center;gap:10px;padding:10px 12px;padding-top:max(10px,env(safe-area-inset-top,0px));background:#081428;border-bottom:1px solid #2A4775;color:#F2F4F9}" +
    ".tszV-t b{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:15px}" +
    ".tszV-t button,.tszV-t a{background:#17315C;border:1px solid #2A4775;color:#F2F4F9;border-radius:10px;padding:8px 12px;font-family:inherit;font-weight:600;font-size:14px;text-decoration:none;cursor:pointer;white-space:nowrap}" +
    ".tszV iframe{flex:1;width:100%;border:0;background:#fff}";
  function estilo() {
    if (document.getElementById("tszE-css")) return;
    var s = document.createElement("style"); s.id = "tszE-css"; s.textContent = CSS; document.head.appendChild(s);
  }
  function esc(x) { return String(x).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  var abierta = null;
  function cerrar() {
    if (!abierta) return; var a = abierta; abierta = null;
    a.el.remove(); document.body.style.overflow = a.ov; document.removeEventListener("keydown", a.k);
    if (a.f && a.f.focus) try { a.f.focus(); } catch (e) {}
  }
  function hoja(html) {
    estilo(); cerrar();
    var el = document.createElement("div"); el.className = "tszE"; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true");
    el.innerHTML = '<div class="tszE-p">' + html + "</div>";
    var k = function (ev) { if (ev.key === "Escape") cerrar(); };
    abierta = { el: el, ov: document.body.style.overflow, k: k, f: document.activeElement };
    el.addEventListener("click", function (ev) { if (ev.target === el || ev.target.closest(".tszE-x")) cerrar(); });
    document.addEventListener("keydown", k);
    document.body.appendChild(el); document.body.style.overflow = "hidden";
    var b = el.querySelector(".tszE-b"); if (b) b.focus();
    return el;
  }

  /* bytes: ArrayBuffer o Uint8Array del PDF ya descifrado; nombre: "TSZ-….pdf" */
  window.tszEntregar = function (bytes, nombre, titulo) {
    var file; try { file = new File([bytes], nombre, { type: "application/pdf" }); } catch (e) { file = new Blob([bytes], { type: "application/pdf" }); }
    var url = URL.createObjectURL(file);
    setTimeout(function () { URL.revokeObjectURL(url); }, 30 * 60000);
    if (!TACTIL) {
      var a = document.createElement("a"); a.href = url; a.download = nombre; document.body.appendChild(a); a.click(); a.remove();
      return;
    }
    var comp = false; try { comp = !!(navigator.canShare && file instanceof File && navigator.canShare({ files: [file] })); } catch (e) {}
    var bShare = comp ? '<button type="button" class="tszE-b' + (IOS ? " p" : "") + '" data-s>Guardar en Archivos o compartir</button>' : "";
    var bDesc = '<a class="tszE-b' + (comp && IOS ? "" : " p") + '" href="' + url + '" download="' + esc(nombre) + '">Descargar PDF</a>';
    /* En iPhone se abre en la misma pestaña (abrir un blob en otra pestaña falla en algunas versiones). */
    var bVer = '<a class="tszE-b" href="' + url + '"' + (IOS ? "" : ' target="_blank" rel="noopener"') + ">Abrir PDF</a>";
    var nota = INAPP
      ? '<p class="tszE-n"><b>Estás en el navegador de una app</b> (Instagram, WhatsApp, Gmail, etc.), que no deja descargar archivos. Toca el menú <b>···</b> y elige <b>«Abrir en Safari»</b> o <b>«Abrir en Chrome»</b>, y descárgala desde ahí.</p>'
      : IOS ? '<p class="tszE-n">' + (comp ? "Para tenerla siempre a mano, elige <b>«Guardar en Archivos»</b>. " : "") + "Si usas «Descargar PDF», queda en la app Archivos → Descargas. Si abres el PDF, vuelve al aula con «atrás».</p>"
      : '<p class="tszE-n">El PDF queda en la carpeta Descargas de tu teléfono.</p>';
    var el = hoja('<div class="tszE-h"><div><b>' + esc(titulo || "Tu guía está lista") + "</b><small>" + esc(nombre) + '</small></div><button type="button" class="tszE-x" aria-label="Cerrar">×</button></div>' +
      (IOS ? bShare + bDesc : bDesc + bShare) + bVer + nota);
    var s = el.querySelector("[data-s]");
    if (s) s.addEventListener("click", function () {
      navigator.share({ files: [file], title: nombre }).catch(function () {});
    });
  };

  /* Enlace externo (por ejemplo, un PDF en Drive) después de esperar al servidor: en celular se ofrece un botón. */
  window.tszAbrirURL = function (url, titulo, nombre) {
    if (!TACTIL) { var w = window.open(url, "_blank", "noopener"); if (w) return; }
    hoja('<div class="tszE-h"><div><b>' + esc(titulo || "Listo") + "</b>" + (nombre ? "<small>" + esc(nombre) + "</small>" : "") + '</div><button type="button" class="tszE-x" aria-label="Cerrar">×</button></div>' +
      '<a class="tszE-b p" href="' + esc(url) + '" target="_blank" rel="noopener">Abrir</a>');
  };

  /* Material HTML (apuntes, slides) dentro de la misma página: funciona en todos los navegadores. */
  window.tszVerHTML = function (html, titulo) {
    estilo();
    var v = document.getElementById("tszV");
    if (!v) {
      v = document.createElement("div"); v.id = "tszV"; v.className = "tszV"; v.setAttribute("role", "dialog"); v.setAttribute("aria-modal", "true");
      v.innerHTML = '<div class="tszV-t"><button type="button" data-c>← Volver</button><b></b>' + (TACTIL ? "" : '<a data-n target="_blank" rel="noopener">Abrir en pestaña ↗</a>') + "</div>" +
        '<iframe title="Material" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" allow="fullscreen"></iframe>';
      document.body.appendChild(v);
      v.querySelector("[data-c]").addEventListener("click", function () { window.tszCerrarHTML(); });
      document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && !v.hidden) window.tszCerrarHTML(); });
    }
    v.querySelector("b").textContent = titulo || "Material";
    var n = v.querySelector("[data-n]");
    if (n) { if (n.href && n.href.indexOf("blob:") === 0) URL.revokeObjectURL(n.href); n.href = URL.createObjectURL(new Blob([html], { type: "text/html" })); }
    v.querySelector("iframe").srcdoc = html;
    v.hidden = false; v.dataset.ov = document.body.style.overflow; document.body.style.overflow = "hidden";
    v.querySelector("[data-c]").focus();
  };
  window.tszCerrarHTML = function () {
    var v = document.getElementById("tszV"); if (!v || v.hidden) return;
    v.hidden = true; v.querySelector("iframe").srcdoc = ""; document.body.style.overflow = v.dataset.ov || "";
  };
  window.tszEsTactil = TACTIL;
})();
