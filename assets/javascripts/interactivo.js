/* ===========================================================================
   Actividades interactivas — Programación en C
   Widgets de refuerzo para lógica booleana, operadores relacionales y
   tablas de verdad. JavaScript puro, sin dependencias.
   Compatible con la navegación instantánea de Material (document$).
   =========================================================================== */
(function () {
  "use strict";

  /* ---------- utilidades ---------- */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function chip(value) {
    var c = el("span", "iv-chip " + (value ? "iv-chip--true" : "iv-chip--false"));
    c.textContent = value ? "1" : "0";
    return c;
  }

  /* =========================================================================
     WIDGET 1 — "Truthiness": el valor de x en if (x)
     ========================================================================= */
  function buildTruthiness(container) {
    if (container.dataset.built) return;
    container.dataset.built = "1";
    container.classList.add("iv-card");

    container.appendChild(el("div", "iv-card__title", "🔎 ¿Verdadero o falso? El valor de <code>x</code>"));
    container.appendChild(el("p", "iv-card__lead",
      "Mueve el deslizador para cambiar <code>x</code>. Observa cómo C decide si el bloque <code>if (x)</code> se ejecuta."));

    var controls = el("div", "iv-row");
    var range = el("input", "iv-range");
    range.type = "range";
    range.min = "-5";
    range.max = "5";
    range.value = "0";
    var badge = el("span", "iv-value-badge", "x = 0");
    controls.appendChild(range);
    controls.appendChild(badge);
    container.appendChild(controls);

    var code = el("pre", "iv-code");
    container.appendChild(code);

    var result = el("div", "iv-result");
    container.appendChild(result);

    var note = el("p", "iv-card__note",
      "Regla de C: <strong>0 es falso</strong>; cualquier otro valor (positivo o negativo) es <strong>verdadero</strong>.");
    container.appendChild(note);

    function update() {
      var x = parseInt(range.value, 10);
      var truthy = x !== 0;
      badge.textContent = "x = " + x;
      code.innerHTML =
        '<span class="iv-kw">if</span> (x) {        <span class="iv-cmt">// x = ' + x + '</span>\n' +
        '    printf("Se ejecuta");\n' +
        "}";
      result.className = "iv-result " + (truthy ? "iv-result--true" : "iv-result--false");
      result.innerHTML = truthy
        ? '<strong>VERDADERO</strong> &nbsp;→&nbsp; el bloque <em>sí</em> se ejecuta &nbsp; <span class="iv-eq">(x vale ' + x + ', distinto de 0)</span>'
        : '<strong>FALSO</strong> &nbsp;→&nbsp; el bloque <em>no</em> se ejecuta &nbsp; <span class="iv-eq">(x vale 0)</span>';
    }
    range.addEventListener("input", update);
    update();
  }

  /* =========================================================================
     WIDGET 2 — Calculadora de operadores relacionales
     ========================================================================= */
  var RELOPS = [
    { sym: "<",  fn: function (a, b) { return a < b; } },
    { sym: ">",  fn: function (a, b) { return a > b; } },
    { sym: "<=", fn: function (a, b) { return a <= b; } },
    { sym: ">=", fn: function (a, b) { return a >= b; } },
    { sym: "==", fn: function (a, b) { return a === b; } },
    { sym: "!=", fn: function (a, b) { return a !== b; } }
  ];

  function buildRelational(container) {
    if (container.dataset.built) return;
    container.dataset.built = "1";
    container.classList.add("iv-card");

    container.appendChild(el("div", "iv-card__title", "⚖️ Calculadora de comparaciones"));
    container.appendChild(el("p", "iv-card__lead",
      "Elige dos valores y un <strong>operador relacional</strong>. En C, una comparación siempre produce <code>1</code> (verdadero) o <code>0</code> (falso)."));

    var row = el("div", "iv-row iv-row--center");
    var inA = el("input", "iv-num"); inA.type = "number"; inA.value = "5";
    var opWrap = el("div", "iv-ops");
    var inB = el("input", "iv-num"); inB.type = "number"; inB.value = "3";
    row.appendChild(inA);
    row.appendChild(opWrap);
    row.appendChild(inB);
    container.appendChild(row);

    var state = { op: 1 }; // índice por defecto: ">"
    RELOPS.forEach(function (o, i) {
      var b = el("button", "iv-op-btn");
      b.type = "button";
      b.textContent = o.sym;
      b.addEventListener("click", function () {
        state.op = i;
        Array.prototype.forEach.call(opWrap.children, function (c) { c.classList.remove("is-active"); });
        b.classList.add("is-active");
        update();
      });
      if (i === state.op) b.classList.add("is-active");
      opWrap.appendChild(b);
    });

    var code = el("pre", "iv-code");
    container.appendChild(code);
    var result = el("div", "iv-result");
    container.appendChild(result);

    function update() {
      var a = parseFloat(inA.value || "0");
      var b = parseFloat(inB.value || "0");
      var o = RELOPS[state.op];
      var val = o.fn(a, b) ? 1 : 0;
      code.innerHTML =
        '<span class="iv-kw">int</span> resultado = (' + a + " " + o.sym + " " + b + ");";
      result.className = "iv-result " + (val ? "iv-result--true" : "iv-result--false");
      result.innerHTML = "resultado = <strong>" + val + "</strong> &nbsp; " +
        (val ? "(verdadero)" : "(falso)");
    }
    inA.addEventListener("input", update);
    inB.addEventListener("input", update);
    update();
  }

  /* =========================================================================
     WIDGET 3 — Tabla de verdad interactiva
     ========================================================================= */
  function buildTruthTable(container) {
    if (container.dataset.built) return;
    container.dataset.built = "1";
    container.classList.add("iv-card");

    container.appendChild(el("div", "iv-card__title", "🧮 Construye la tabla de verdad"));
    container.appendChild(el("p", "iv-card__lead",
      "Cambia los valores de <code>A</code> y <code>B</code> con los interruptores. Mira cómo se calculan los operadores lógicos y qué fila de la tabla corresponde."));

    var state = { A: 1, B: 1 };

    var toggles = el("div", "iv-row iv-row--center iv-toggles");
    function makeToggle(label, key) {
      var wrap = el("div", "iv-toggle");
      wrap.appendChild(el("span", "iv-toggle__label", label));
      var btn = el("button", "iv-toggle__btn");
      btn.type = "button";
      function paint() {
        btn.textContent = state[key];
        btn.className = "iv-toggle__btn " + (state[key] ? "is-true" : "is-false");
      }
      btn.addEventListener("click", function () { state[key] = state[key] ? 0 : 1; paint(); update(); });
      paint();
      wrap.appendChild(btn);
      return wrap;
    }
    toggles.appendChild(makeToggle("A", "A"));
    toggles.appendChild(makeToggle("B", "B"));
    container.appendChild(toggles);

    /* chips de resultado en vivo */
    var live = el("div", "iv-live");
    container.appendChild(live);

    /* tabla AND/OR */
    var table = el("table", "iv-truth");
    table.innerHTML =
      "<thead><tr><th>A</th><th>B</th><th>A &amp;&amp; B</th><th>A || B</th></tr></thead>";
    var tbody = el("tbody");
    var rowsDef = [[1, 1], [1, 0], [0, 1], [0, 0]];
    var rowEls = rowsDef.map(function (r) {
      var tr = el("tr");
      var and = (r[0] && r[1]) ? 1 : 0;
      var or = (r[0] || r[1]) ? 1 : 0;
      tr.innerHTML =
        "<td>" + r[0] + "</td><td>" + r[1] + "</td>" +
        '<td class="' + (and ? "iv-td-true" : "iv-td-false") + '">' + and + "</td>" +
        '<td class="' + (or ? "iv-td-true" : "iv-td-false") + '">' + or + "</td>";
      tbody.appendChild(tr);
      return { def: r, tr: tr };
    });
    table.appendChild(tbody);
    container.appendChild(table);

    function update() {
      var A = state.A, B = state.B;
      var and = (A && B) ? 1 : 0;
      var or = (A || B) ? 1 : 0;
      var notA = A ? 0 : 1;
      var notB = B ? 0 : 1;

      live.innerHTML = "";
      function pair(label, v) {
        var g = el("div", "iv-live__item");
        g.appendChild(el("span", "iv-live__label", label));
        g.appendChild(chip(v));
        return g;
      }
      live.appendChild(pair("A && B", and));
      live.appendChild(pair("A || B", or));
      live.appendChild(pair("!A", notA));
      live.appendChild(pair("!B", notB));

      rowEls.forEach(function (re) {
        var match = re.def[0] === A && re.def[1] === B;
        re.tr.className = match ? "is-current" : "";
      });
    }
    update();
  }

  /* =========================================================================
     WIDGET 4 — Quiz "¿1 o 0?"
     ========================================================================= */
  function buildQuiz(container) {
    if (container.dataset.built) return;
    container.dataset.built = "1";
    container.classList.add("iv-card", "iv-quiz");

    var dataNode = container.querySelector("script.iv-quiz-data");
    var questions = [];
    if (dataNode) {
      try { questions = JSON.parse(dataNode.textContent); } catch (e) { questions = []; }
    }
    if (!questions.length) return;

    var idx = 0, score = 0, answered = false;

    var head = el("div", "iv-quiz__head");
    var title = el("div", "iv-card__title", "🎯 Reto: ¿el resultado es 1 o 0?");
    var progress = el("div", "iv-quiz__progress");
    head.appendChild(title);
    head.appendChild(progress);
    container.appendChild(head);

    var qbox = el("pre", "iv-code iv-quiz__expr");
    container.appendChild(qbox);

    var opts = el("div", "iv-quiz__opts");
    container.appendChild(opts);

    var feedback = el("div", "iv-quiz__feedback");
    container.appendChild(feedback);

    var nav = el("div", "iv-quiz__nav");
    var nextBtn = el("button", "iv-btn", "Siguiente →");
    nextBtn.type = "button";
    nav.appendChild(nextBtn);
    container.appendChild(nav);

    function render() {
      answered = false;
      var q = questions[idx];
      progress.textContent = "Pregunta " + (idx + 1) + " de " + questions.length + " · Aciertos: " + score;
      qbox.innerHTML = '<span class="iv-kw">¿Resultado de</span>  ' + q.expr + "  <span class=\"iv-kw\">?</span>";
      opts.innerHTML = "";
      feedback.className = "iv-quiz__feedback";
      feedback.innerHTML = "";
      nextBtn.style.visibility = "hidden";

      [["1", "verdadero"], ["0", "falso"]].forEach(function (pair, i) {
        var b = el("button", "iv-quiz__opt");
        b.type = "button";
        b.innerHTML = "<strong>" + pair[0] + "</strong> <span>(" + pair[1] + ")</span>";
        b.addEventListener("click", function () { choose(i, b); });
        opts.appendChild(b);
      });
    }

    function choose(choice, btn) {
      if (answered) return;
      answered = true;
      var q = questions[idx];
      var correct = choice === q.answer;
      if (correct) score++;
      Array.prototype.forEach.call(opts.children, function (c, i) {
        c.classList.add("is-locked");
        if (i === q.answer) c.classList.add("is-correct");
      });
      if (!correct) btn.classList.add("is-wrong");
      feedback.className = "iv-quiz__feedback " + (correct ? "is-correct" : "is-wrong");
      feedback.innerHTML = (correct ? "✓ ¡Correcto! " : "✗ No exactamente. ") + q.explain;
      progress.textContent = "Pregunta " + (idx + 1) + " de " + questions.length + " · Aciertos: " + score;
      nextBtn.style.visibility = "visible";
      nextBtn.textContent = (idx + 1 < questions.length) ? "Siguiente →" : "Ver resultado";
    }

    function finish() {
      head.querySelector(".iv-quiz__progress").textContent = "";
      qbox.style.display = "none";
      opts.style.display = "none";
      feedback.style.display = "none";
      nav.innerHTML = "";
      var pct = Math.round((score / questions.length) * 100);
      var msg = pct === 100 ? "¡Perfecto! Dominas la lógica booleana. 🏆"
        : pct >= 60 ? "¡Buen trabajo! Repasa los que fallaste. 👍"
        : "Vuelve a la teoría y reinténtalo, ¡tú puedes! 💪";
      var summary = el("div", "iv-quiz__summary");
      summary.innerHTML = "<div class=\"iv-quiz__score\">" + score + " / " + questions.length +
        "</div><p>" + msg + "</p>";
      var retry = el("button", "iv-btn", "↺ Reintentar");
      retry.type = "button";
      retry.addEventListener("click", function () {
        idx = 0; score = 0;
        qbox.style.display = ""; opts.style.display = ""; feedback.style.display = "";
        summary.remove();
        nav.appendChild(nextBtn);
        render();
      });
      summary.appendChild(retry);
      container.insertBefore(summary, nav);
    }

    nextBtn.addEventListener("click", function () {
      if (!answered) return;
      if (idx + 1 < questions.length) { idx++; render(); }
      else { finish(); }
    });

    render();
  }

  /* =========================================================================
     Inicialización (compatible con navegación instantánea)
     ========================================================================= */
  function initAll() {
    document.querySelectorAll('[data-widget="truthiness"]').forEach(buildTruthiness);
    document.querySelectorAll('[data-widget="relational"]').forEach(buildRelational);
    document.querySelectorAll('[data-widget="truthtable"]').forEach(buildTruthTable);
    document.querySelectorAll('[data-widget="quiz"]').forEach(buildQuiz);
  }

  if (typeof window.document$ !== "undefined" && window.document$.subscribe) {
    window.document$.subscribe(function () { initAll(); });
  } else if (document.readyState !== "loading") {
    initAll();
  } else {
    document.addEventListener("DOMContentLoaded", initAll);
  }
})();
