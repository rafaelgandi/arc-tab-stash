// LM: 2025-02-09 22:42:18 [Modified module.full.no-external.js script. Remove obfuscated code.]

function e(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), n.push.apply(n, r)
    }
    return n
}

function t(t) {
    for (var n = 1; n < arguments.length; n++) {
        var r = null != arguments[n] ? arguments[n] : {};
        n % 2 ? e(Object(r), !0).forEach((function(e) {
            i(t, e, r[e])
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : e(Object(r)).forEach((function(e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e))
        }))
    }
    return t
}

function n(e, t, n, r, i, o, s) {
    try {
        var a = e[o](s),
            l = a.value
    } catch (e) {
        return void n(e)
    }
    a.done ? t(l) : Promise.resolve(l).then(r, i)
}

function r(e) {
    return function() {
        var t = this,
            r = arguments;
        return new Promise((function(i, o) {
            var s = e.apply(t, r);

            function a(e) {
                n(s, i, o, a, l, "next", e)
            }

            function l(e) {
                n(s, i, o, a, l, "throw", e)
            }
            a(void 0)
        }))
    }
}

function i(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e
}

function o(e, t) {
    if (null == e) return {};
    var n, r, i = function(e, t) {
        if (null == e) return {};
        var n, r, i = {},
            o = Object.keys(e);
        for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || (i[n] = e[n]);
        return i
    }(e, t);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n])
    }
    return i
}
var s, a = ["type"],
    l = Object.defineProperty,
    c = (e, t, n) => ((e, t, n) => t in e ? l(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n)(e, "symbol" != typeof t ? t + "" : t, n),
    u = Object.defineProperty,
    d = (e, t, n) => ((e, t, n) => t in e ? u(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n)(e, "symbol" != typeof t ? t + "" : t, n),
    h = (e => (e[e.Document = 0] = "Document", e[e.DocumentType = 1] = "DocumentType", e[e.Element = 2] = "Element", e[e.Text = 3] = "Text", e[e.CDATA = 4] = "CDATA", e[e.Comment = 5] = "Comment", e))(h || {}),
    p = {
        Node: ["childNodes", "parentNode", "parentElement", "textContent"],
        ShadowRoot: ["host", "styleSheets"],
        Element: ["shadowRoot", "querySelector", "querySelectorAll"],
        MutationObserver: []
    },
    v = {
        Node: ["contains", "getRootNode"],
        ShadowRoot: ["getSelection"],
        Element: [],
        MutationObserver: ["constructor"]
    },
    g = () => {
        try {
            return !!globalThis.Zone
        } catch (e) {
            return !1
        }
    },
    f = {};

function m(e) {
    if (f[e]) return f[e];
    var t = globalThis[e],
        n = t.prototype,
        r = e in p ? p[e] : void 0,
        i = Boolean(r && r.every((e => {
            var t, r;
            return Boolean(null == (r = null == (t = Object.getOwnPropertyDescriptor(n, e)) ? void 0 : t.get) ? void 0 : r.toString().includes("[native code]"))
        }))),
        o = e in v ? v[e] : void 0,
        s = Boolean(o && o.every((e => {
            var t;
            return "function" == typeof n[e] && (null == (t = n[e]) ? void 0 : t.toString().includes("[native code]"))
        })));
    if (i && s && !g()) return f[e] = t.prototype, t.prototype;
    try {
        var a = document.createElement("iframe");
        document.body.appendChild(a);
        var l = a.contentWindow;
        if (!l) return t.prototype;
        var c = l[e].prototype;
        return document.body.removeChild(a), c ? f[e] = c : t.prototype
    } catch (e) {
        return t.prototype
    }
}
var _ = {};

function y(e, t, n) {
    var r, i = "".concat(e, ".").concat(String(n));
    if (_[i]) return _[i].call(t);
    var o = m(e),
        s = null == (r = Object.getOwnPropertyDescriptor(o, n)) ? void 0 : r.get;
    return s ? (_[i] = s, s.call(t)) : t[n]
}
var b = {};

function w(e, t, n) {
    var r = "".concat(e, ".").concat(String(n));
    if (b[r]) return b[r].bind(t);
    var i = m(e)[n];
    return "function" != typeof i ? t[n] : (b[r] = i, i.bind(t))
}
var S = {
    childNodes: function(e) {
        return y("Node", e, "childNodes")
    },
    parentNode: function(e) {
        return y("Node", e, "parentNode")
    },
    parentElement: function(e) {
        return y("Node", e, "parentElement")
    },
    textContent: function(e) {
        return y("Node", e, "textContent")
    },
    contains: function(e, t) {
        return w("Node", e, "contains")(t)
    },
    getRootNode: function(e) {
        return w("Node", e, "getRootNode")()
    },
    host: function(e) {
        return e && "host" in e ? y("ShadowRoot", e, "host") : null
    },
    styleSheets: function(e) {
        return e.styleSheets
    },
    shadowRoot: function(e) {
        return e && "shadowRoot" in e ? y("Element", e, "shadowRoot") : null
    },
    querySelector: function(e, t) {
        return y("Element", e, "querySelector")(t)
    },
    querySelectorAll: function(e, t) {
        return y("Element", e, "querySelectorAll")(t)
    },
    mutationObserver: function() {
        return m("MutationObserver").constructor
    }
};

function C(e) {
    return e.nodeType === e.ELEMENT_NODE
}

function I(e) {
    var t = e && "host" in e && "mode" in e && S.host(e) || null;
    return Boolean(t && "shadowRoot" in t && S.shadowRoot(t) === e)
}

function k(e) {
    return "[object ShadowRoot]" === Object.prototype.toString.call(e)
}

function E(e) {
    try {
        var t = e.rules || e.cssRules;
        if (!t) return null;
        var n = Array.from(t, (t => x(t, e.href))).join("");
        return (r = n).includes(" background-clip: text;") && !r.includes(" -webkit-background-clip: text;") && (r = r.replace(/\sbackground-clip:\s*text;/g, " -webkit-background-clip: text; background-clip: text;")), r
    } catch (e) {
        return null
    }
    var r
}

function x(e, t) {
    if (function(e) {
            return "styleSheet" in e
        }(e)) {
        var n;
        try {
            n = E(e.styleSheet) || function(e) {
                var {
                    cssText: t
                } = e;
                if (t.split('"').length < 3) return t;
                var n = ["@import", "url(".concat(JSON.stringify(e.href), ")")];
                return "" === e.layerName ? n.push("layer") : e.layerName && n.push("layer(".concat(e.layerName, ")")), e.supportsText && n.push("supports(".concat(e.supportsText, ")")), e.media.length && n.push(e.media.mediaText), n.join(" ") + ";"
            }(e)
        } catch (t) {
            n = e.cssText
        }
        return e.styleSheet.href ? q(n, e.styleSheet.href) : n
    }
    var r, i = e.cssText;
    return function(e) {
        return "selectorText" in e
    }(e) && e.selectorText.includes(":") && (r = /(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm, i = i.replace(r, "$1\\$2")), t ? q(i, t) : i
}

function T(e, t) {
    return Array.from(e.styleSheets).find((e => e.href === t))
}
let M = class {
    constructor() {
        d(this, "idNodeMap", new Map), d(this, "nodeMetaMap", new WeakMap)
    }
    getId(e) {
        var t;
        if (!e) return -1;
        var n = null == (t = this.getMeta(e)) ? void 0 : t.id;
        return null != n ? n : -1
    }
    getNode(e) {
        return this.idNodeMap.get(e) || null
    }
    getIds() {
        return Array.from(this.idNodeMap.keys())
    }
    getMeta(e) {
        return this.nodeMetaMap.get(e) || null
    }
    removeNodeFromMap(e) {
        var t = this.getId(e);
        this.idNodeMap.delete(t), e.childNodes && e.childNodes.forEach((e => this.removeNodeFromMap(e)))
    }
    has(e) {
        return this.idNodeMap.has(e)
    }
    hasNode(e) {
        return this.nodeMetaMap.has(e)
    }
    add(e, t) {
        var n = t.id;
        this.idNodeMap.set(n, e), this.nodeMetaMap.set(e, t)
    }
    replace(e, t) {
        var n = this.getNode(e);
        if (n) {
            var r = this.nodeMetaMap.get(n);
            r && this.nodeMetaMap.set(t, r)
        }
        this.idNodeMap.set(e, t)
    }
    reset() {
        this.idNodeMap = new Map, this.nodeMetaMap = new WeakMap
    }
};

function R(e) {
    var {
        element: t,
        maskInputOptions: n,
        tagName: r,
        type: i,
        value: o,
        maskInputFn: s
    } = e, a = o || "", l = i && A(i);
    return (n[r.toLowerCase()] || l && n[l]) && (a = s ? s(a, t) : "*".repeat(a.length)), a
}

function A(e) {
    return e.toLowerCase()
}
var N = "__rrweb_original__";

function F(e) {
    var t = e.type;
    return e.hasAttribute("data-rr-is-password") ? "password" : t ? A(t) : null
}

function O(e, t) {
    var n, r;
    try {
        r = new URL(e, null != t ? t : window.location.href)
    } catch (e) {
        return null
    }
    var i = r.pathname.match(/\.([0-9a-z]+)(?:$)/i);
    return null !== (n = null == i ? void 0 : i[1]) && void 0 !== n ? n : null
}
var P = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm,
    L = /^(?:[a-z+]+:)?\/\//i,
    D = /^www\..*/i,
    B = /^(data:)([^,]*),(.*)/i;

function q(e, t) {
    return (e || "").replace(P, ((e, n, r, i, o, s) => {
        var a, l = r || o || s,
            c = n || i || "";
        if (!l) return e;
        if (L.test(l) || D.test(l)) return "url(".concat(c).concat(l).concat(c, ")");
        if (B.test(l)) return "url(".concat(c).concat(l).concat(c, ")");
        if ("/" === l[0]) return "url(".concat(c).concat((a = t, (a.indexOf("//") > -1 ? a.split("/").slice(0, 3).join("/") : a.split("/")[0]).split("?")[0] + l)).concat(c, ")");
        var u = t.split("/"),
            d = l.split("/");
        for (var h of (u.pop(), d)) "." !== h && (".." === h ? u.pop() : u.push(h));
        return "url(".concat(c).concat(u.join("/")).concat(c, ")")
    }))
}
var H, $, W = 1,
    V = new RegExp("[^a-z0-9-_:]"),
    Z = -2;

function G() {
    return W++
}
var U = /^[^ \t\n\r\u000c]+/,
    j = /^[, \t\n\r\u000c]+/;
var z = new WeakMap;

function Y(e, t) {
    return t && "" !== t.trim() ? J(e, t) : t
}

function X(e) {
    return Boolean("svg" === e.tagName || e.ownerSVGElement)
}

function J(e, t) {
    var n = z.get(e);
    if (n || (n = e.createElement("a"), z.set(e, n)), t) {
        if (t.startsWith("blob:") || t.startsWith("data:")) return t
    } else t = "";
    return n.setAttribute("href", t), n.href
}

function K(e, t, n, r) {
    return r ? "src" === n || "href" === n && ("use" !== t || "#" !== r[0]) || "xlink:href" === n && "#" !== r[0] ? Y(e, r) : "background" !== n || "table" !== t && "td" !== t && "th" !== t ? "srcset" === n ? function(e, t) {
        if ("" === t.trim()) return t;
        var n = 0;

        function r(e) {
            var r, i = e.exec(t.substring(n));
            return i ? (r = i[0], n += r.length, r) : ""
        }
        for (var i = []; r(j), !(n >= t.length);) {
            var o = r(U);
            if ("," === o.slice(-1)) o = Y(e, o.substring(0, o.length - 1)), i.push(o);
            else {
                var s = "";
                o = Y(e, o);
                for (var a = !1;;) {
                    var l = t.charAt(n);
                    if ("" === l) {
                        i.push((o + s).trim());
                        break
                    }
                    if (a) ")" === l && (a = !1);
                    else {
                        if ("," === l) {
                            n += 1, i.push((o + s).trim());
                            break
                        }
                        "(" === l && (a = !0)
                    }
                    s += l, n += 1
                }
            }
        }
        return i.join(", ")
    }(e, r) : "style" === n ? q(r, J(e)) : "object" === t && "data" === n ? Y(e, r) : r : Y(e, r) : r
}

function Q(e, t, n) {
    return ("video" === e || "audio" === e) && "autoplay" === t
}

function ee(e, t, n) {
    if (!e) return !1;
    if (e.nodeType !== e.ELEMENT_NODE) return !!n && ee(S.parentNode(e), t, n);
    for (var r = e.classList.length; r--;) {
        var i = e.classList[r];
        if (t.test(i)) return !0
    }
    return !!n && ee(S.parentNode(e), t, n)
}

function te(e, t, n, r) {
    var i;
    if (C(e)) {
        if (i = e, !S.childNodes(i).length) return !1
    } else {
        if (null === S.parentElement(e)) return !1;
        i = S.parentElement(e)
    }
    try {
        if ("string" == typeof t) {
            if (r) {
                if (i.closest(".".concat(t))) return !0
            } else if (i.classList.contains(t)) return !0
        } else if (ee(i, t, r)) return !0;
        if (n)
            if (r) {
                if (i.closest(n)) return !0
            } else if (i.matches(n)) return !0
    } catch (e) {}
    return !1
}

function ne(e, t) {
    var {
        doc: n,
        mirror: r,
        blockClass: i,
        blockSelector: o,
        needsMask: s,
        inlineStylesheet: a,
        maskInputOptions: l = {},
        maskTextFn: c,
        maskInputFn: u,
        dataURLOptions: d = {},
        inlineImages: p,
        recordCanvas: v,
        keepIframeSrcFn: g,
        newlyAddedElement: f = !1
    } = t, m = function(e, t) {
        if (!t.hasNode(e)) return;
        var n = t.getId(e);
        return 1 === n ? void 0 : n
    }(n, r);
    switch (e.nodeType) {
        case e.DOCUMENT_NODE:
            return "CSS1Compat" !== e.compatMode ? {
                type: h.Document,
                childNodes: [],
                compatMode: e.compatMode
            } : {
                type: h.Document,
                childNodes: []
            };
        case e.DOCUMENT_TYPE_NODE:
            return {
                type: h.DocumentType, name: e.name, publicId: e.publicId, systemId: e.systemId, rootId: m
            };
        case e.ELEMENT_NODE:
            return function(e, t) {
                for (var n, {
                        doc: r,
                        blockClass: i,
                        blockSelector: o,
                        inlineStylesheet: s,
                        maskInputOptions: a = {},
                        maskInputFn: l,
                        dataURLOptions: c = {},
                        inlineImages: u,
                        recordCanvas: d,
                        keepIframeSrcFn: p,
                        newlyAddedElement: v = !1,
                        rootId: g
                    } = t, f = function(e, t, n) {
                        try {
                            if ("string" == typeof t) {
                                if (e.classList.contains(t)) return !0
                            } else
                                for (var r = e.classList.length; r--;) {
                                    var i = e.classList[r];
                                    if (t.test(i)) return !0
                                }
                            if (n) return e.matches(n)
                        } catch (e) {}
                        return !1
                    }(e, i, o), m = function(e) {
                        if (e instanceof HTMLFormElement) return "form";
                        var t = A(e.tagName);
                        return V.test(t) ? "div" : t
                    }(e), _ = {}, y = e.attributes.length, b = 0; b < y; b++) {
                    var w = e.attributes[b];
                    Q(m, w.name, w.value) || (_[w.name] = K(r, m, A(w.name), w.value))
                }
                if ("link" === m && s) {
                    var C = e.href,
                        I = T(r, C);
                    if (!I && C.includes(".css")) I = T(r, window.location.origin + "/" + C.replace(window.location.href, ""));
                    var k = null;
                    I && (k = E(I)), k && (delete _.rel, delete _.href, _._cssText = k)
                }
                if ("style" === m && e.sheet && !(e.innerText || S.textContent(e) || "").trim().length) {
                    var x = E(e.sheet);
                    x && (_._cssText = x)
                }
                if ("input" === m || "textarea" === m || "select" === m) {
                    var M = e.value,
                        O = e.checked;
                    "radio" !== _.type && "checkbox" !== _.type && "submit" !== _.type && "button" !== _.type && M ? _.value = R({
                        element: e,
                        type: F(e),
                        tagName: m,
                        value: M,
                        maskInputOptions: a,
                        maskInputFn: l
                    }) : O && (_.checked = O)
                }
                "option" === m && (e.selected && !a.select ? _.selected = !0 : delete _.selected);
                if ("dialog" === m && e.open) try {
                    _.rr_open_mode = e.matches("dialog:modal") ? "modal" : "non-modal"
                } catch (e) {
                    _.rr_open_mode = "modal", _.ph_rr_could_not_detect_modal = !0
                }
                if ("canvas" === m && d)
                    if ("2d" === e.__context)(function(e) {
                        var t = e.getContext("2d");
                        if (!t) return !0;
                        for (var n = 0; n < e.width; n += 50)
                            for (var r = 0; r < e.height; r += 50) {
                                var i = t.getImageData,
                                    o = N in i ? i[N] : i;
                                if (new Uint32Array(o.call(t, n, r, Math.min(50, e.width - n), Math.min(50, e.height - r)).data.buffer).some((e => 0 !== e))) return !1
                            }
                        return !0
                    })(e) || (_.rr_dataURL = e.toDataURL(c.type, c.quality));
                    else if (!("__context" in e)) {
                    var P = e.toDataURL(c.type, c.quality),
                        L = r.createElement("canvas");
                    L.width = e.width, L.height = e.height, P !== L.toDataURL(c.type, c.quality) && (_.rr_dataURL = P)
                }
                if ("img" === m && u) {
                    H || (H = r.createElement("canvas"), $ = H.getContext("2d"));
                    var D = e,
                        B = D.currentSrc || D.getAttribute("src") || "<unknown-src>",
                        q = D.crossOrigin,
                        W = () => {
                            D.removeEventListener("load", W);
                            try {
                                H.width = D.naturalWidth, H.height = D.naturalHeight, $.drawImage(D, 0, 0), _.rr_dataURL = H.toDataURL(c.type, c.quality)
                            } catch (e) {
                                if ("anonymous" !== D.crossOrigin) return D.crossOrigin = "anonymous", void(D.complete && 0 !== D.naturalWidth ? W() : D.addEventListener("load", W));
                                console.warn("Cannot inline img src=".concat(B, "! Error: ").concat(e))
                            }
                            "anonymous" === D.crossOrigin && (q ? _.crossOrigin = q : D.removeAttribute("crossorigin"))
                        };
                    D.complete && 0 !== D.naturalWidth ? W() : D.addEventListener("load", W)
                }
                if ("audio" === m || "video" === m) {
                    var Z = _;
                    Z.rr_mediaState = e.paused ? "paused" : "played", Z.rr_mediaCurrentTime = e.currentTime, Z.rr_mediaPlaybackRate = e.playbackRate, Z.rr_mediaMuted = e.muted, Z.rr_mediaLoop = e.loop, Z.rr_mediaVolume = e.volume
                }
                v || (e.scrollLeft && (_.rr_scrollLeft = e.scrollLeft), e.scrollTop && (_.rr_scrollTop = e.scrollTop));
                if (f) {
                    var {
                        width: G,
                        height: U
                    } = e.getBoundingClientRect();
                    _ = {
                        class: _.class,
                        rr_width: "".concat(G, "px"),
                        rr_height: "".concat(U, "px")
                    }
                }
                "iframe" !== m || p(_.src) || (e.contentDocument || (_.rr_src = _.src), delete _.src);
                try {
                    customElements.get(m) && (n = !0)
                } catch (e) {}
                return {
                    type: h.Element,
                    tagName: m,
                    attributes: _,
                    childNodes: [],
                    isSVG: X(e) || void 0,
                    needBlock: f,
                    rootId: g,
                    isCustom: n
                }
            }(e, {
                doc: n,
                blockClass: i,
                blockSelector: o,
                inlineStylesheet: a,
                maskInputOptions: l,
                maskInputFn: u,
                dataURLOptions: d,
                inlineImages: p,
                recordCanvas: v,
                keepIframeSrcFn: g,
                newlyAddedElement: f,
                rootId: m
            });
        case e.TEXT_NODE:
            return function(e, t) {
                var n, {
                        needsMask: r,
                        maskTextFn: i,
                        rootId: o
                    } = t,
                    s = S.parentNode(e),
                    a = s && s.tagName,
                    l = S.textContent(e),
                    c = "STYLE" === a || void 0,
                    u = "SCRIPT" === a || void 0;
                if (c && l) {
                    try {
                        e.nextSibling || e.previousSibling || (null == (n = s.sheet) ? void 0 : n.cssRules) && (l = E(s.sheet))
                    } catch (t) {
                        console.warn("Cannot get CSS styles from text's parentNode. Error: ".concat(t), e)
                    }
                    l = q(l, J(t.doc))
                }
                u && (l = "SCRIPT_PLACEHOLDER");
                !c && !u && l && r && (l = i ? i(l, S.parentElement(e)) : l.replace(/[\S]/g, "*"));
                return {
                    type: h.Text,
                    textContent: l || "",
                    isStyle: c,
                    rootId: o
                }
            }(e, {
                doc: n,
                needsMask: s,
                maskTextFn: c,
                rootId: m
            });
        case e.CDATA_SECTION_NODE:
            return {
                type: h.CDATA, textContent: "", rootId: m
            };
        case e.COMMENT_NODE:
            return {
                type: h.Comment, textContent: S.textContent(e) || "", rootId: m
            };
        default:
            return !1
    }
}

function re(e) {
    return null == e ? "" : e.toLowerCase()
}

function ie(e, t) {
    var {
        doc: n,
        mirror: r,
        blockClass: i,
        blockSelector: o,
        maskTextClass: s,
        maskTextSelector: a,
        skipChild: l = !1,
        inlineStylesheet: c = !0,
        maskInputOptions: u = {},
        maskTextFn: d,
        maskInputFn: p,
        slimDOMOptions: v,
        dataURLOptions: g = {},
        inlineImages: f = !1,
        recordCanvas: m = !1,
        onSerialize: _,
        onIframeLoad: y,
        iframeLoadTimeout: b = 5e3,
        onStylesheetLoad: w,
        stylesheetLoadTimeout: E = 5e3,
        keepIframeSrcFn: x = (() => !1),
        newlyAddedElement: T = !1
    } = t, {
        needsMask: M
    } = t, {
        preserveWhiteSpace: R = !0
    } = t;
    M || (M = te(e, s, a, void 0 === M));
    var A, N = ne(e, {
        doc: n,
        mirror: r,
        blockClass: i,
        blockSelector: o,
        needsMask: M,
        inlineStylesheet: c,
        maskInputOptions: u,
        maskTextFn: d,
        maskInputFn: p,
        dataURLOptions: g,
        inlineImages: f,
        recordCanvas: m,
        keepIframeSrcFn: x,
        newlyAddedElement: T
    });
    if (!N) return console.warn(e, "not serialized"), null;
    A = r.hasNode(e) ? r.getId(e) : ! function(e, t) {
        if (t.comment && e.type === h.Comment) return !0;
        if (e.type === h.Element) {
            if (t.script && ("script" === e.tagName || "link" === e.tagName && ("preload" === e.attributes.rel || "modulepreload" === e.attributes.rel) && "script" === e.attributes.as || "link" === e.tagName && "prefetch" === e.attributes.rel && "string" == typeof e.attributes.href && "js" === O(e.attributes.href))) return !0;
            if (t.headFavicon && ("link" === e.tagName && "shortcut icon" === e.attributes.rel || "meta" === e.tagName && (re(e.attributes.name).match(/^msapplication-tile(image|color)$/) || "application-name" === re(e.attributes.name) || "icon" === re(e.attributes.rel) || "apple-touch-icon" === re(e.attributes.rel) || "shortcut icon" === re(e.attributes.rel)))) return !0;
            if ("meta" === e.tagName) {
                if (t.headMetaDescKeywords && re(e.attributes.name).match(/^description|keywords$/)) return !0;
                if (t.headMetaSocial && (re(e.attributes.property).match(/^(og|twitter|fb):/) || re(e.attributes.name).match(/^(og|twitter):/) || "pinterest" === re(e.attributes.name))) return !0;
                if (t.headMetaRobots && ("robots" === re(e.attributes.name) || "googlebot" === re(e.attributes.name) || "bingbot" === re(e.attributes.name))) return !0;
                if (t.headMetaHttpEquiv && void 0 !== e.attributes["http-equiv"]) return !0;
                if (t.headMetaAuthorship && ("author" === re(e.attributes.name) || "generator" === re(e.attributes.name) || "framework" === re(e.attributes.name) || "publisher" === re(e.attributes.name) || "progid" === re(e.attributes.name) || re(e.attributes.property).match(/^article:/) || re(e.attributes.property).match(/^product:/))) return !0;
                if (t.headMetaVerification && ("google-site-verification" === re(e.attributes.name) || "yandex-verification" === re(e.attributes.name) || "csrf-token" === re(e.attributes.name) || "p:domain_verify" === re(e.attributes.name) || "verify-v1" === re(e.attributes.name) || "verification" === re(e.attributes.name) || "shopify-checkout-api-token" === re(e.attributes.name))) return !0
            }
        }
        return !1
    }(N, v) && (R || N.type !== h.Text || N.isStyle || N.textContent.replace(/^\s+|\s+$/gm, "").length) ? G() : Z;
    var F = Object.assign(N, {
        id: A
    });
    if (r.add(e, F), A === Z) return null;
    _ && _(e);
    var P = !l;
    if (F.type === h.Element) {
        P = P && !F.needBlock, delete F.needBlock;
        var L = S.shadowRoot(e);
        L && k(L) && (F.isShadowHost = !0)
    }
    if ((F.type === h.Document || F.type === h.Element) && P) {
        v.headWhitespace && F.type === h.Element && "head" === F.tagName && (R = !1);
        var D = {
            doc: n,
            mirror: r,
            blockClass: i,
            blockSelector: o,
            needsMask: M,
            maskTextClass: s,
            maskTextSelector: a,
            skipChild: l,
            inlineStylesheet: c,
            maskInputOptions: u,
            maskTextFn: d,
            maskInputFn: p,
            slimDOMOptions: v,
            dataURLOptions: g,
            inlineImages: f,
            recordCanvas: m,
            preserveWhiteSpace: R,
            onSerialize: _,
            onIframeLoad: y,
            iframeLoadTimeout: b,
            onStylesheetLoad: w,
            stylesheetLoadTimeout: E,
            keepIframeSrcFn: x
        };
        if (F.type === h.Element && "textarea" === F.tagName && void 0 !== F.attributes.value);
        else
            for (var B of Array.from(S.childNodes(e))) {
                var q = ie(B, D);
                q && F.childNodes.push(q)
            }
        var H = null;
        if (C(e) && (H = S.shadowRoot(e)))
            for (var $ of Array.from(S.childNodes(H))) {
                var W = ie($, D);
                W && (k(H) && (W.isShadow = !0), F.childNodes.push(W))
            }
    }
    var V = S.parentNode(e);
    return V && I(V) && k(V) && (F.isShadow = !0), F.type === h.Element && "iframe" === F.tagName && function(e, t, n) {
        var r = e.contentWindow;
        if (r) {
            var i, o = !1;
            try {
                i = r.document.readyState
            } catch (e) {
                return
            }
            if ("complete" === i) {
                var s = "about:blank";
                if (r.location.href !== s || e.src === s || "" === e.src) return setTimeout(t, 0), e.addEventListener("load", t);
                e.addEventListener("load", t)
            } else {
                var a = setTimeout((() => {
                    o || (t(), o = !0)
                }), n);
                e.addEventListener("load", (() => {
                    clearTimeout(a), o = !0, t()
                }))
            }
        }
    }(e, (() => {
        var t = e.contentDocument;
        if (t && y) {
            var n = ie(t, {
                doc: t,
                mirror: r,
                blockClass: i,
                blockSelector: o,
                needsMask: M,
                maskTextClass: s,
                maskTextSelector: a,
                skipChild: !1,
                inlineStylesheet: c,
                maskInputOptions: u,
                maskTextFn: d,
                maskInputFn: p,
                slimDOMOptions: v,
                dataURLOptions: g,
                inlineImages: f,
                recordCanvas: m,
                preserveWhiteSpace: R,
                onSerialize: _,
                onIframeLoad: y,
                iframeLoadTimeout: b,
                onStylesheetLoad: w,
                stylesheetLoadTimeout: E,
                keepIframeSrcFn: x
            });
            n && y(e, n)
        }
    }), b), F.type === h.Element && "link" === F.tagName && "string" == typeof F.attributes.rel && ("stylesheet" === F.attributes.rel || "preload" === F.attributes.rel && "string" == typeof F.attributes.href && "css" === O(F.attributes.href)) && function(e, t, n) {
        var r, i = !1;
        try {
            r = e.sheet
        } catch (e) {
            return
        }
        if (!r) {
            var o = setTimeout((() => {
                i || (t(), i = !0)
            }), n);
            e.addEventListener("load", (() => {
                clearTimeout(o), i = !0, t()
            }))
        }
    }(e, (() => {
        if (w) {
            var t = ie(e, {
                doc: n,
                mirror: r,
                blockClass: i,
                blockSelector: o,
                needsMask: M,
                maskTextClass: s,
                maskTextSelector: a,
                skipChild: !1,
                inlineStylesheet: c,
                maskInputOptions: u,
                maskTextFn: d,
                maskInputFn: p,
                slimDOMOptions: v,
                dataURLOptions: g,
                inlineImages: f,
                recordCanvas: m,
                preserveWhiteSpace: R,
                onSerialize: _,
                onIframeLoad: y,
                iframeLoadTimeout: b,
                onStylesheetLoad: w,
                stylesheetLoadTimeout: E,
                keepIframeSrcFn: x
            });
            t && w(e, t)
        }
    }), E), F
}
let oe = class e {
    constructor() {
        __publicField2(this, "parentElement", null), __publicField2(this, "parentNode", null), __publicField2(this, "ownerDocument"), __publicField2(this, "firstChild", null), __publicField2(this, "lastChild", null), __publicField2(this, "previousSibling", null), __publicField2(this, "nextSibling", null), __publicField2(this, "ELEMENT_NODE", 1), __publicField2(this, "TEXT_NODE", 3), __publicField2(this, "nodeType"), __publicField2(this, "nodeName"), __publicField2(this, "RRNodeType")
    }
    get childNodes() {
        for (var e = [], t = this.firstChild; t;) e.push(t), t = t.nextSibling;
        return e
    }
    contains(t) {
        if (!(t instanceof e)) return !1;
        if (t.ownerDocument !== this.ownerDocument) return !1;
        if (t === this) return !0;
        for (; t.parentNode;) {
            if (t.parentNode === this) return !0;
            t = t.parentNode
        }
        return !1
    }
    appendChild(e) {
        throw new Error("RRDomException: Failed to execute 'appendChild' on 'RRNode': This RRNode type does not support this method.")
    }
    insertBefore(e, t) {
        throw new Error("RRDomException: Failed to execute 'insertBefore' on 'RRNode': This RRNode type does not support this method.")
    }
    removeChild(e) {
        throw new Error("RRDomException: Failed to execute 'removeChild' on 'RRNode': This RRNode type does not support this method.")
    }
    toString() {
        return "RRNode"
    }
};
var se = {
        Node: ["childNodes", "parentNode", "parentElement", "textContent"],
        ShadowRoot: ["host", "styleSheets"],
        Element: ["shadowRoot", "querySelector", "querySelectorAll"],
        MutationObserver: []
    },
    ae = {
        Node: ["contains", "getRootNode"],
        ShadowRoot: ["getSelection"],
        Element: [],
        MutationObserver: ["constructor"]
    },
    le = {};

function ce(e) {
    if (le[e]) return le[e];
    var t = globalThis[e],
        n = t.prototype,
        r = e in se ? se[e] : void 0,
        i = Boolean(r && r.every((e => {
            var t, r;
            return Boolean(null == (r = null == (t = Object.getOwnPropertyDescriptor(n, e)) ? void 0 : t.get) ? void 0 : r.toString().includes("[native code]"))
        }))),
        o = e in ae ? ae[e] : void 0,
        s = Boolean(o && o.every((e => {
            var t;
            return "function" == typeof n[e] && (null == (t = n[e]) ? void 0 : t.toString().includes("[native code]"))
        })));
    if (i && s && !g()) return le[e] = t.prototype, t.prototype;
    try {
        var a = document.createElement("iframe");
        document.body.appendChild(a);
        var l = a.contentWindow;
        if (!l) return t.prototype;
        var c = l[e].prototype;
        return document.body.removeChild(a), c ? le[e] = c : n
    } catch (e) {
        return n
    }
}
var ue = {};

function de(e, t, n) {
    var r, i = "".concat(e, ".").concat(String(n));
    if (ue[i]) return ue[i].call(t);
    var o = ce(e),
        s = null == (r = Object.getOwnPropertyDescriptor(o, n)) ? void 0 : r.get;
    return s ? (ue[i] = s, s.call(t)) : t[n]
}
var he = {};

function pe(e, t, n) {
    var r = "".concat(e, ".").concat(String(n));
    if (he[r]) return he[r].bind(t);
    var i = ce(e)[n];
    return "function" != typeof i ? t[n] : (he[r] = i, i.bind(t))
}

function ve() {
    return ce("MutationObserver").constructor
}
var ge = {
    childNodes: function(e) {
        return de("Node", e, "childNodes")
    },
    parentNode: function(e) {
        return de("Node", e, "parentNode")
    },
    parentElement: function(e) {
        return de("Node", e, "parentElement")
    },
    textContent: function(e) {
        return de("Node", e, "textContent")
    },
    contains: function(e, t) {
        return pe("Node", e, "contains")(t)
    },
    getRootNode: function(e) {
        return pe("Node", e, "getRootNode")()
    },
    host: function(e) {
        return e && "host" in e ? de("ShadowRoot", e, "host") : null
    },
    styleSheets: function(e) {
        return e.styleSheets
    },
    shadowRoot: function(e) {
        return e && "shadowRoot" in e ? de("Element", e, "shadowRoot") : null
    },
    querySelector: function(e, t) {
        return de("Element", e, "querySelector")(t)
    },
    querySelectorAll: function(e, t) {
        return de("Element", e, "querySelectorAll")(t)
    },
    mutationObserver: ve
};

function fe(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document,
        r = {
            capture: !0,
            passive: !0
        };
    return n.addEventListener(e, t, r), () => n.removeEventListener(e, t, r)
}
var me = "Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.",
    _e = {
        map: {},
        getId: () => (console.error(me), -1),
        getNode: () => (console.error(me), null),
        removeNodeFromMap() {
            console.error(me)
        },
        has: () => (console.error(me), !1),
        reset() {
            console.error(me)
        }
    };

function ye(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
        r = null,
        i = 0;
    return function() {
        for (var o = arguments.length, s = new Array(o), a = 0; a < o; a++) s[a] = arguments[a];
        var l = Date.now();
        i || !1 !== n.leading || (i = l);
        var c = t - (l - i),
            u = this;
        c <= 0 || c > t ? (r && (clearTimeout(r), r = null), i = l, e.apply(u, s)) : r || !1 === n.trailing || (r = setTimeout((() => {
            i = !1 === n.leading ? 0 : Date.now(), r = null, e.apply(u, s)
        }), c))
    }
}

function be(e, t, n, r) {
    var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : window,
        o = i.Object.getOwnPropertyDescriptor(e, t);
    return i.Object.defineProperty(e, t, r ? n : {
        set(e) {
            setTimeout((() => {
                n.set.call(this, e)
            }), 0), o && o.set && o.set.call(this, e)
        }
    }), () => be(e, t, o || {}, !0)
}

function we(e, t, n) {
    try {
        if (!(t in e)) return () => {};
        var r = e[t],
            i = n(r);
        return "function" == typeof i && (i.prototype = i.prototype || {}, Object.defineProperties(i, {
            __rrweb_original__: {
                enumerable: !1,
                value: r
            }
        })), e[t] = i, () => {
            e[t] = r
        }
    } catch (e) {
        return () => {}
    }
}
"undefined" != typeof window && window.Proxy && window.Reflect && (_e = new Proxy(_e, {
    get: (e, t, n) => ("map" === t && console.error(me), Reflect.get(e, t, n))
}));
var Se = Date.now;

function Ce(e) {
    var t, n, r, i, o = e.document;
    return {
        left: o.scrollingElement ? o.scrollingElement.scrollLeft : void 0 !== e.pageXOffset ? e.pageXOffset : o.documentElement.scrollLeft || (null == o ? void 0 : o.body) && (null == (t = ge.parentElement(o.body)) ? void 0 : t.scrollLeft) || (null == (n = null == o ? void 0 : o.body) ? void 0 : n.scrollLeft) || 0,
        top: o.scrollingElement ? o.scrollingElement.scrollTop : void 0 !== e.pageYOffset ? e.pageYOffset : (null == o ? void 0 : o.documentElement.scrollTop) || (null == o ? void 0 : o.body) && (null == (r = ge.parentElement(o.body)) ? void 0 : r.scrollTop) || (null == (i = null == o ? void 0 : o.body) ? void 0 : i.scrollTop) || 0
    }
}

function Ie() {
    return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight
}

function ke() {
    return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth
}

function Ee(e) {
    return e ? e.nodeType === e.ELEMENT_NODE ? e : ge.parentElement(e) : null
}

function xe(e, t, n, r) {
    if (!e) return !1;
    var i = Ee(e);
    if (!i) return !1;
    try {
        if ("string" == typeof t) {
            if (i.classList.contains(t)) return !0;
            if (r && null !== i.closest("." + t)) return !0
        } else if (ee(i, t, r)) return !0
    } catch (e) {}
    if (n) {
        if (i.matches(n)) return !0;
        if (r && null !== i.closest(n)) return !0
    }
    return !1
}

function Te(e, t, n) {
    return !("TITLE" !== e.tagName || !n.headTitleMutations) || t.getId(e) === Z
}

function Me(e, t) {
    if (I(e)) return !1;
    var n = t.getId(e);
    if (!t.has(n)) return !0;
    var r = ge.parentNode(e);
    return (!r || r.nodeType !== e.DOCUMENT_NODE) && (!r || Me(r, t))
}

function Re(e) {
    return Boolean(e.changedTouches)
}

function Ae(e, t) {
    return Boolean("IFRAME" === e.nodeName && t.getMeta(e))
}

function Ne(e, t) {
    return Boolean("LINK" === e.nodeName && e.nodeType === e.ELEMENT_NODE && e.getAttribute && "stylesheet" === e.getAttribute("rel") && t.getMeta(e))
}

function Fe(e) {
    return !!e && (e instanceof oe && "shadowRoot" in e ? Boolean(e.shadowRoot) : Boolean(ge.shadowRoot(e)))
}
/[1-9][0-9]{12}/.test(Date.now().toString()) || (Se = () => (new Date).getTime());
let Oe = class {
    constructor() {
        c(this, "id", 1), c(this, "styleIDMap", new WeakMap), c(this, "idStyleMap", new Map)
    }
    getId(e) {
        var t;
        return null !== (t = this.styleIDMap.get(e)) && void 0 !== t ? t : -1
    }
    has(e) {
        return this.styleIDMap.has(e)
    }
    add(e, t) {
        return this.has(e) ? this.getId(e) : (n = void 0 === t ? this.id++ : t, this.styleIDMap.set(e, n), this.idStyleMap.set(n, e), n);
        var n
    }
    getStyle(e) {
        return this.idStyleMap.get(e) || null
    }
    reset() {
        this.styleIDMap = new WeakMap, this.idStyleMap = new Map, this.id = 1
    }
    generateId() {
        return this.id++
    }
};

function Pe(e) {
    var t, n = null;
    return "getRootNode" in e && (null == (t = ge.getRootNode(e)) ? void 0 : t.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && ge.host(ge.getRootNode(e)) && (n = ge.host(ge.getRootNode(e))), n
}

function Le(e) {
    var t = e.ownerDocument;
    if (!t) return !1;
    var n = function(e) {
        for (var t, n = e; t = Pe(n);) n = t;
        return n
    }(e);
    return ge.contains(t, n)
}

function De(e) {
    var t = e.ownerDocument;
    return !!t && (ge.contains(t, e) || Le(e))
}
var Be = (e => (e[e.DomContentLoaded = 0] = "DomContentLoaded", e[e.Load = 1] = "Load", e[e.FullSnapshot = 2] = "FullSnapshot", e[e.IncrementalSnapshot = 3] = "IncrementalSnapshot", e[e.Meta = 4] = "Meta", e[e.Custom = 5] = "Custom", e[e.Plugin = 6] = "Plugin", e))(Be || {}),
    qe = (e => (e[e.Mutation = 0] = "Mutation", e[e.MouseMove = 1] = "MouseMove", e[e.MouseInteraction = 2] = "MouseInteraction", e[e.Scroll = 3] = "Scroll", e[e.ViewportResize = 4] = "ViewportResize", e[e.Input = 5] = "Input", e[e.TouchMove = 6] = "TouchMove", e[e.MediaInteraction = 7] = "MediaInteraction", e[e.StyleSheetRule = 8] = "StyleSheetRule", e[e.CanvasMutation = 9] = "CanvasMutation", e[e.Font = 10] = "Font", e[e.Log = 11] = "Log", e[e.Drag = 12] = "Drag", e[e.StyleDeclaration = 13] = "StyleDeclaration", e[e.Selection = 14] = "Selection", e[e.AdoptedStyleSheet = 15] = "AdoptedStyleSheet", e[e.CustomElement = 16] = "CustomElement", e))(qe || {}),
    He = (e => (e[e.MouseUp = 0] = "MouseUp", e[e.MouseDown = 1] = "MouseDown", e[e.Click = 2] = "Click", e[e.ContextMenu = 3] = "ContextMenu", e[e.DblClick = 4] = "DblClick", e[e.Focus = 5] = "Focus", e[e.Blur = 6] = "Blur", e[e.TouchStart = 7] = "TouchStart", e[e.TouchMove_Departed = 8] = "TouchMove_Departed", e[e.TouchEnd = 9] = "TouchEnd", e[e.TouchCancel = 10] = "TouchCancel", e))(He || {}),
    $e = (e => (e[e.Mouse = 0] = "Mouse", e[e.Pen = 1] = "Pen", e[e.Touch = 2] = "Touch", e))($e || {}),
    We = (e => (e[e["2D"] = 0] = "2D", e[e.WebGL = 1] = "WebGL", e[e.WebGL2 = 2] = "WebGL2", e))(We || {}),
    Ve = (e => (e[e.Play = 0] = "Play", e[e.Pause = 1] = "Pause", e[e.Seeked = 2] = "Seeked", e[e.VolumeChange = 3] = "VolumeChange", e[e.RateChange = 4] = "RateChange", e))(Ve || {});

function Ze(e) {
    return "__ln" in e
}
class Ge {
    constructor() {
        c(this, "length", 0), c(this, "head", null), c(this, "tail", null)
    }
    get(e) {
        if (e >= this.length) throw new Error("Position outside of list range");
        for (var t = this.head, n = 0; n < e; n++) t = (null == t ? void 0 : t.next) || null;
        return t
    }
    addNode(e) {
        var t = {
            value: e,
            previous: null,
            next: null
        };
        if (e.__ln = t, e.previousSibling && Ze(e.previousSibling)) {
            var n = e.previousSibling.__ln.next;
            t.next = n, t.previous = e.previousSibling.__ln, e.previousSibling.__ln.next = t, n && (n.previous = t)
        } else if (e.nextSibling && Ze(e.nextSibling) && e.nextSibling.__ln.previous) {
            var r = e.nextSibling.__ln.previous;
            t.previous = r, t.next = e.nextSibling.__ln, e.nextSibling.__ln.previous = t, r && (r.next = t)
        } else this.head && (this.head.previous = t), t.next = this.head, this.head = t;
        null === t.next && (this.tail = t), this.length++
    }
    removeNode(e) {
        var t = e.__ln;
        this.head && (t.previous ? (t.previous.next = t.next, t.next ? t.next.previous = t.previous : this.tail = t.previous) : (this.head = t.next, this.head ? this.head.previous = null : this.tail = null), e.__ln && delete e.__ln, this.length--)
    }
}
var Ue, je = (e, t) => "".concat(e, "@").concat(t);
class ze {
    constructor() {
        c(this, "frozen", !1), c(this, "locked", !1), c(this, "texts", []), c(this, "attributes", []), c(this, "attributeMap", new WeakMap), c(this, "removes", []), c(this, "mapRemoves", []), c(this, "movedMap", {}), c(this, "addedSet", new Set), c(this, "movedSet", new Set), c(this, "droppedSet", new Set), c(this, "mutationCb"), c(this, "blockClass"), c(this, "blockSelector"), c(this, "maskTextClass"), c(this, "maskTextSelector"), c(this, "inlineStylesheet"), c(this, "maskInputOptions"), c(this, "maskTextFn"), c(this, "maskInputFn"), c(this, "keepIframeSrcFn"), c(this, "recordCanvas"), c(this, "inlineImages"), c(this, "slimDOMOptions"), c(this, "dataURLOptions"), c(this, "doc"), c(this, "mirror"), c(this, "iframeManager"), c(this, "stylesheetManager"), c(this, "shadowDomManager"), c(this, "canvasManager"), c(this, "processedNodeManager"), c(this, "unattachedDoc"), c(this, "processMutations", (e => {
            e.forEach(this.processMutation), this.emit()
        })), c(this, "emit", (() => {
            if (!this.frozen && !this.locked) {
                for (var e = [], t = new Set, n = new Ge, r = e => {
                        for (var t = e, n = Z; n === Z;) n = (t = t && t.nextSibling) && this.mirror.getId(t);
                        return n
                    }, i = i => {
                        var o = ge.parentNode(i);
                        if (o && De(i) && "TEXTAREA" !== o.tagName) {
                            var s = I(o) ? this.mirror.getId(Pe(i)) : this.mirror.getId(o),
                                a = r(i);
                            if (-1 === s || -1 === a) return n.addNode(i);
                            var l = ie(i, {
                                doc: this.doc,
                                mirror: this.mirror,
                                blockClass: this.blockClass,
                                blockSelector: this.blockSelector,
                                maskTextClass: this.maskTextClass,
                                maskTextSelector: this.maskTextSelector,
                                skipChild: !0,
                                newlyAddedElement: !0,
                                inlineStylesheet: this.inlineStylesheet,
                                maskInputOptions: this.maskInputOptions,
                                maskTextFn: this.maskTextFn,
                                maskInputFn: this.maskInputFn,
                                slimDOMOptions: this.slimDOMOptions,
                                dataURLOptions: this.dataURLOptions,
                                recordCanvas: this.recordCanvas,
                                inlineImages: this.inlineImages,
                                onSerialize: e => {
                                    Ae(e, this.mirror) && this.iframeManager.addIframe(e), Ne(e, this.mirror) && this.stylesheetManager.trackLinkElement(e), Fe(i) && this.shadowDomManager.addShadowRoot(ge.shadowRoot(i), this.doc)
                                },
                                onIframeLoad: (e, t) => {
                                    this.iframeManager.attachIframe(e, t), this.shadowDomManager.observeAttachShadow(e)
                                },
                                onStylesheetLoad: (e, t) => {
                                    this.stylesheetManager.attachLinkElement(e, t)
                                }
                            });
                            l && (e.push({
                                parentId: s,
                                nextId: a,
                                node: l
                            }), t.add(l.id))
                        }
                    }; this.mapRemoves.length;) this.mirror.removeNodeFromMap(this.mapRemoves.shift());
                for (var o of this.movedSet) Xe(this.removes, o, this.mirror) && !this.movedSet.has(ge.parentNode(o)) || i(o);
                for (var s of this.addedSet) Je(this.droppedSet, s) || Xe(this.removes, s, this.mirror) ? Je(this.movedSet, s) ? i(s) : this.droppedSet.add(s) : i(s);
                for (var a = null; n.length;) {
                    var l = null;
                    if (a) {
                        var c = this.mirror.getId(ge.parentNode(a.value)),
                            u = r(a.value); - 1 !== c && -1 !== u && (l = a)
                    }
                    if (!l)
                        for (var d = n.tail; d;) {
                            var h = d;
                            if (d = d.previous, h) {
                                var p = this.mirror.getId(ge.parentNode(h.value));
                                if (-1 === r(h.value)) continue;
                                if (-1 !== p) {
                                    l = h;
                                    break
                                }
                                var v = h.value,
                                    g = ge.parentNode(v);
                                if (g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                                    var f = ge.host(g);
                                    if (-1 !== this.mirror.getId(f)) {
                                        l = h;
                                        break
                                    }
                                }
                            }
                        }
                    if (!l) {
                        for (; n.head;) n.removeNode(n.head.value);
                        break
                    }
                    a = l.previous, n.removeNode(l.value), i(l.value)
                }
                var m = {
                    texts: this.texts.map((e => {
                        var t = e.node,
                            n = ge.parentNode(t);
                        return n && "TEXTAREA" === n.tagName && this.genTextAreaValueMutation(n), {
                            id: this.mirror.getId(t),
                            value: e.value
                        }
                    })).filter((e => !t.has(e.id))).filter((e => this.mirror.has(e.id))),
                    attributes: this.attributes.map((e => {
                        var {
                            attributes: t
                        } = e;
                        if ("string" == typeof t.style) {
                            var n = JSON.stringify(e.styleDiff),
                                r = JSON.stringify(e._unchangedStyles);
                            n.length < t.style.length && (n + r).split("var(").length === t.style.split("var(").length && (t.style = e.styleDiff)
                        }
                        return {
                            id: this.mirror.getId(e.node),
                            attributes: t
                        }
                    })).filter((e => !t.has(e.id))).filter((e => this.mirror.has(e.id))),
                    removes: this.removes,
                    adds: e
                };
                (m.texts.length || m.attributes.length || m.removes.length || m.adds.length) && (this.texts = [], this.attributes = [], this.attributeMap = new WeakMap, this.removes = [], this.addedSet = new Set, this.movedSet = new Set, this.droppedSet = new Set, this.movedMap = {}, this.mutationCb(m))
            }
        })), c(this, "genTextAreaValueMutation", (e => {
            var t = this.attributeMap.get(e);
            t || (t = {
                node: e,
                attributes: {},
                styleDiff: {},
                _unchangedStyles: {}
            }, this.attributes.push(t), this.attributeMap.set(e, t)), t.attributes.value = Array.from(ge.childNodes(e), (e => ge.textContent(e) || "")).join("")
        })), c(this, "processMutation", (e => {
            if (!Te(e.target, this.mirror, this.slimDOMOptions)) switch (e.type) {
                case "characterData":
                    var t = ge.textContent(e.target);
                    xe(e.target, this.blockClass, this.blockSelector, !1) || t === e.oldValue || this.texts.push({
                        value: te(e.target, this.maskTextClass, this.maskTextSelector, !0) && t ? this.maskTextFn ? this.maskTextFn(t, Ee(e.target)) : t.replace(/[\S]/g, "*") : t,
                        node: e.target
                    });
                    break;
                case "attributes":
                    var n = e.target,
                        r = e.attributeName,
                        i = e.target.getAttribute(r);
                    if ("value" === r) {
                        var o = F(n);
                        i = R({
                            element: n,
                            maskInputOptions: this.maskInputOptions,
                            tagName: n.tagName,
                            type: o,
                            value: i,
                            maskInputFn: this.maskInputFn
                        })
                    }
                    if (xe(e.target, this.blockClass, this.blockSelector, !1) || i === e.oldValue) return;
                    var s = this.attributeMap.get(e.target);
                    if ("IFRAME" === n.tagName && "src" === r && !this.keepIframeSrcFn(i)) {
                        if (n.contentDocument) return;
                        r = "rr_src"
                    }
                    if (s || (s = {
                            node: e.target,
                            attributes: {},
                            styleDiff: {},
                            _unchangedStyles: {}
                        }, this.attributes.push(s), this.attributeMap.set(e.target, s)), "type" === r && "INPUT" === n.tagName && "password" === (e.oldValue || "").toLowerCase() && n.setAttribute("data-rr-is-password", "true"), !Q(n.tagName, r))
                        if (s.attributes[r] = K(this.doc, A(n.tagName), A(r), i), "style" === r) {
                            if (!this.unattachedDoc) try {
                                this.unattachedDoc = document.implementation.createHTMLDocument()
                            } catch (e) {
                                this.unattachedDoc = this.doc
                            }
                            var a = this.unattachedDoc.createElement("span");
                            for (var l of (e.oldValue && a.setAttribute("style", e.oldValue), Array.from(n.style))) {
                                var c = n.style.getPropertyValue(l),
                                    u = n.style.getPropertyPriority(l);
                                c !== a.style.getPropertyValue(l) || u !== a.style.getPropertyPriority(l) ? s.styleDiff[l] = "" === u ? c : [c, u] : s._unchangedStyles[l] = [c, u]
                            }
                            for (var d of Array.from(a.style)) "" === n.style.getPropertyValue(d) && (s.styleDiff[d] = !1)
                        } else "open" === r && "DIALOG" === n.tagName && (n.matches("dialog:modal") ? s.attributes.rr_open_mode = "modal" : s.attributes.rr_open_mode = "non-modal");
                    break;
                case "childList":
                    if (xe(e.target, this.blockClass, this.blockSelector, !0)) return;
                    if ("TEXTAREA" === e.target.tagName) return void this.genTextAreaValueMutation(e.target);
                    e.addedNodes.forEach((t => this.genAdds(t, e.target))), e.removedNodes.forEach((t => {
                        var n = this.mirror.getId(t),
                            r = I(e.target) ? this.mirror.getId(ge.host(e.target)) : this.mirror.getId(e.target);
                        xe(e.target, this.blockClass, this.blockSelector, !1) || Te(t, this.mirror, this.slimDOMOptions) || ! function(e, t) {
                            return -1 !== t.getId(e)
                        }(t, this.mirror) || (this.addedSet.has(t) ? (Ye(this.addedSet, t), this.droppedSet.add(t)) : this.addedSet.has(e.target) && -1 === n || Me(e.target, this.mirror) || (this.movedSet.has(t) && this.movedMap[je(n, r)] ? Ye(this.movedSet, t) : this.removes.push({
                            parentId: r,
                            id: n,
                            isShadow: !(!I(e.target) || !k(e.target)) || void 0
                        })), this.mapRemoves.push(t))
                    }))
            }
        })), c(this, "genAdds", ((e, t) => {
            if (!this.processedNodeManager.inOtherBuffer(e, this) && !this.addedSet.has(e) && !this.movedSet.has(e)) {
                if (this.mirror.hasNode(e)) {
                    if (Te(e, this.mirror, this.slimDOMOptions)) return;
                    this.movedSet.add(e);
                    var n = null;
                    t && this.mirror.hasNode(t) && (n = this.mirror.getId(t)), n && -1 !== n && (this.movedMap[je(this.mirror.getId(e), n)] = !0)
                } else this.addedSet.add(e), this.droppedSet.delete(e);
                xe(e, this.blockClass, this.blockSelector, !1) || (ge.childNodes(e).forEach((e => this.genAdds(e))), Fe(e) && ge.childNodes(ge.shadowRoot(e)).forEach((t => {
                    this.processedNodeManager.add(t, this), this.genAdds(t, e)
                })))
            }
        }))
    }
    init(e) {
        ["mutationCb", "blockClass", "blockSelector", "maskTextClass", "maskTextSelector", "inlineStylesheet", "maskInputOptions", "maskTextFn", "maskInputFn", "keepIframeSrcFn", "recordCanvas", "inlineImages", "slimDOMOptions", "dataURLOptions", "doc", "mirror", "iframeManager", "stylesheetManager", "shadowDomManager", "canvasManager", "processedNodeManager"].forEach((t => {
            this[t] = e[t]
        }))
    }
    freeze() {
        this.frozen = !0, this.canvasManager.freeze()
    }
    unfreeze() {
        this.frozen = !1, this.canvasManager.unfreeze(), this.emit()
    }
    isFrozen() {
        return this.frozen
    }
    lock() {
        this.locked = !0, this.canvasManager.lock()
    }
    unlock() {
        this.locked = !1, this.canvasManager.unlock(), this.emit()
    }
    reset() {
        this.shadowDomManager.reset(), this.canvasManager.reset()
    }
}

function Ye(e, t) {
    e.delete(t), ge.childNodes(t).forEach((t => Ye(e, t)))
}

function Xe(e, t, n) {
    return 0 !== e.length && function(e, t, n) {
        var r = ge.parentNode(t),
            i = function() {
                var t = n.getId(r);
                if (e.some((e => e.id === t))) return {
                    v: !0
                };
                r = ge.parentNode(r)
            };
        for (; r;) {
            var o = i();
            if ("object" == typeof o) return o.v
        }
        return !1
    }(e, t, n)
}

function Je(e, t) {
    return 0 !== e.size && Ke(e, t)
}

function Ke(e, t) {
    var n = ge.parentNode(t);
    return !!n && (!!e.has(n) || Ke(e, n))
}
var Qe = e => {
        if (!Ue) return e;
        return function() {
            try {
                return e(...arguments)
            } catch (e) {
                if (Ue && !0 === Ue(e)) return;
                throw e
            }
        }
    },
    et = [];

function tt(e) {
    try {
        if ("composedPath" in e) {
            var t = e.composedPath();
            if (t.length) return t[0]
        } else if ("path" in e && e.path.length) return e.path[0]
    } catch (e) {}
    return e && e.target
}

function nt(e, t) {
    var n = new ze;
    et.push(n), n.init(e);
    var r = new(ve())(Qe(n.processMutations.bind(n)));
    return r.observe(t, {
        attributes: !0,
        attributeOldValue: !0,
        characterData: !0,
        characterDataOldValue: !0,
        childList: !0,
        subtree: !0
    }), r
}

function rt(e) {
    var {
        mouseInteractionCb: n,
        doc: r,
        mirror: i,
        blockClass: o,
        blockSelector: s,
        sampling: a
    } = e;
    if (!1 === a.mouseInteraction) return () => {};
    var l = !0 === a.mouseInteraction || void 0 === a.mouseInteraction ? {} : a.mouseInteraction,
        c = [],
        u = null;
    return Object.keys(He).filter((e => Number.isNaN(Number(e)) && !e.endsWith("_Departed") && !1 !== l[e])).forEach((e => {
        var a = A(e),
            l = (e => r => {
                var a = tt(r);
                if (!xe(a, o, s, !0)) {
                    var l = null,
                        c = e;
                    if ("pointerType" in r) {
                        switch (r.pointerType) {
                            case "mouse":
                                l = $e.Mouse;
                                break;
                            case "touch":
                                l = $e.Touch;
                                break;
                            case "pen":
                                l = $e.Pen
                        }
                        l === $e.Touch ? He[e] === He.MouseDown ? c = "TouchStart" : He[e] === He.MouseUp && (c = "TouchEnd") : $e.Pen
                    } else Re(r) && (l = $e.Touch);
                    null !== l ? (u = l, (c.startsWith("Touch") && l === $e.Touch || c.startsWith("Mouse") && l === $e.Mouse) && (l = null)) : He[e] === He.Click && (l = u, u = null);
                    var d = Re(r) ? r.changedTouches[0] : r;
                    if (d) {
                        var h = i.getId(a),
                            {
                                clientX: p,
                                clientY: v
                            } = d;
                        Qe(n)(t({
                            type: He[c],
                            id: h,
                            x: p,
                            y: v
                        }, null !== l && {
                            pointerType: l
                        }))
                    }
                }
            })(e);
        if (window.PointerEvent) switch (He[e]) {
            case He.MouseDown:
            case He.MouseUp:
                a = a.replace("mouse", "pointer");
                break;
            case He.TouchStart:
            case He.TouchEnd:
                return
        }
        c.push(fe(a, l, r))
    })), Qe((() => {
        c.forEach((e => e()))
    }))
}

function it(e) {
    var {
        scrollCb: t,
        doc: n,
        mirror: r,
        blockClass: i,
        blockSelector: o,
        sampling: s
    } = e;
    return fe("scroll", Qe(ye(Qe((e => {
        var s = tt(e);
        if (s && !xe(s, i, o, !0)) {
            var a = r.getId(s);
            if (s === n && n.defaultView) {
                var l = Ce(n.defaultView);
                t({
                    id: a,
                    x: l.left,
                    y: l.top
                })
            } else t({
                id: a,
                x: s.scrollLeft,
                y: s.scrollTop
            })
        }
    })), s.scroll || 100)), n)
}
var ot = ["INPUT", "TEXTAREA", "SELECT"],
    st = new WeakMap;

function at(e) {
    return function(e, t) {
        if (dt("CSSGroupingRule") && e.parentRule instanceof CSSGroupingRule || dt("CSSMediaRule") && e.parentRule instanceof CSSMediaRule || dt("CSSSupportsRule") && e.parentRule instanceof CSSSupportsRule || dt("CSSConditionRule") && e.parentRule instanceof CSSConditionRule) {
            var n = Array.from(e.parentRule.cssRules).indexOf(e);
            t.unshift(n)
        } else if (e.parentStyleSheet) {
            var r = Array.from(e.parentStyleSheet.cssRules).indexOf(e);
            t.unshift(r)
        }
        return t
    }(e, [])
}

function lt(e, t, n) {
    var r, i;
    return e ? (e.ownerNode ? r = t.getId(e.ownerNode) : i = n.getId(e), {
        styleId: i,
        id: r
    }) : {}
}

function ct(e, t) {
    var n, r, i, {
            mirror: o,
            stylesheetManager: s
        } = e,
        a = null;
    a = "#document" === t.nodeName ? o.getId(t) : o.getId(ge.host(t));
    var l = "#document" === t.nodeName ? null == (n = t.defaultView) ? void 0 : n.Document : null == (i = null == (r = t.ownerDocument) ? void 0 : r.defaultView) ? void 0 : i.ShadowRoot,
        c = (null == l ? void 0 : l.prototype) ? Object.getOwnPropertyDescriptor(null == l ? void 0 : l.prototype, "adoptedStyleSheets") : void 0;
    return null !== a && -1 !== a && l && c ? (Object.defineProperty(t, "adoptedStyleSheets", {
        configurable: c.configurable,
        enumerable: c.enumerable,
        get() {
            var e;
            return null == (e = c.get) ? void 0 : e.call(this)
        },
        set(e) {
            var t, n = null == (t = c.set) ? void 0 : t.call(this, e);
            if (null !== a && -1 !== a) try {
                s.adoptStyleSheets(e, a)
            } catch (e) {}
            return n
        }
    }), Qe((() => {
        Object.defineProperty(t, "adoptedStyleSheets", {
            configurable: c.configurable,
            enumerable: c.enumerable,
            get: c.get,
            set: c.set
        })
    }))) : () => {}
}

function ut(e) {
    var n, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        i = e.doc.defaultView;
    if (!i) return () => {};
    ! function(e, t) {
        var {
            mutationCb: n,
            mousemoveCb: r,
            mouseInteractionCb: i,
            scrollCb: o,
            viewportResizeCb: s,
            inputCb: a,
            mediaInteractionCb: l,
            styleSheetRuleCb: c,
            styleDeclarationCb: u,
            canvasMutationCb: d,
            fontCb: h,
            selectionCb: p,
            customElementCb: v
        } = e;
        e.mutationCb = function() {
            t.mutation && t.mutation(...arguments), n(...arguments)
        }, e.mousemoveCb = function() {
            t.mousemove && t.mousemove(...arguments), r(...arguments)
        }, e.mouseInteractionCb = function() {
            t.mouseInteraction && t.mouseInteraction(...arguments), i(...arguments)
        }, e.scrollCb = function() {
            t.scroll && t.scroll(...arguments), o(...arguments)
        }, e.viewportResizeCb = function() {
            t.viewportResize && t.viewportResize(...arguments), s(...arguments)
        }, e.inputCb = function() {
            t.input && t.input(...arguments), a(...arguments)
        }, e.mediaInteractionCb = function() {
            t.mediaInteaction && t.mediaInteaction(...arguments), l(...arguments)
        }, e.styleSheetRuleCb = function() {
            t.styleSheetRule && t.styleSheetRule(...arguments), c(...arguments)
        }, e.styleDeclarationCb = function() {
            t.styleDeclaration && t.styleDeclaration(...arguments), u(...arguments)
        }, e.canvasMutationCb = function() {
            t.canvasMutation && t.canvasMutation(...arguments), d(...arguments)
        }, e.fontCb = function() {
            t.font && t.font(...arguments), h(...arguments)
        }, e.selectionCb = function() {
            t.selection && t.selection(...arguments), p(...arguments)
        }, e.customElementCb = function() {
            t.customElement && t.customElement(...arguments), v(...arguments)
        }
    }(e, r), e.recordDOM && (n = nt(e, e.doc));
    var o = function(e) {
            var {
                mousemoveCb: t,
                sampling: n,
                doc: r,
                mirror: i
            } = e;
            if (!1 === n.mousemove) return () => {};
            var o, s = "number" == typeof n.mousemove ? n.mousemove : 50,
                a = "number" == typeof n.mousemoveCallback ? n.mousemoveCallback : 500,
                l = [],
                c = ye(Qe((e => {
                    var n = Date.now() - o;
                    t(l.map((e => (e.timeOffset -= n, e))), e), l = [], o = null
                })), a),
                u = Qe(ye(Qe((e => {
                    var t = tt(e),
                        {
                            clientX: n,
                            clientY: r
                        } = Re(e) ? e.changedTouches[0] : e;
                    o || (o = Se()), l.push({
                        x: n,
                        y: r,
                        id: i.getId(t),
                        timeOffset: Se() - o
                    }), c("undefined" != typeof DragEvent && e instanceof DragEvent ? qe.Drag : e instanceof MouseEvent ? qe.MouseMove : qe.TouchMove)
                })), s, {
                    trailing: !1
                })),
                d = [fe("mousemove", u, r), fe("touchmove", u, r), fe("drag", u, r)];
            return Qe((() => {
                d.forEach((e => e()))
            }))
        }(e),
        s = rt(e),
        a = it(e),
        l = function(e, t) {
            var {
                viewportResizeCb: n
            } = e, {
                win: r
            } = t, i = -1, o = -1;
            return fe("resize", Qe(ye(Qe((() => {
                var e = Ie(),
                    t = ke();
                i === e && o === t || (n({
                    width: Number(t),
                    height: Number(e)
                }), i = e, o = t)
            })), 200)), r)
        }(e, {
            win: i
        }),
        c = function(e) {
            var {
                inputCb: n,
                doc: r,
                mirror: i,
                blockClass: o,
                blockSelector: s,
                ignoreClass: a,
                ignoreSelector: l,
                maskInputOptions: c,
                maskInputFn: u,
                sampling: d,
                userTriggeredOnInput: h
            } = e;

            function p(e) {
                var t = tt(e),
                    n = e.isTrusted,
                    i = t && t.tagName;
                if (t && "OPTION" === i && (t = ge.parentElement(t)), t && i && !(ot.indexOf(i) < 0) && !xe(t, o, s, !0) && !(t.classList.contains(a) || l && t.matches(l))) {
                    var d = t.value,
                        p = !1,
                        g = F(t) || "";
                    "radio" === g || "checkbox" === g ? p = t.checked : (c[i.toLowerCase()] || c[g]) && (d = R({
                        element: t,
                        maskInputOptions: c,
                        tagName: i,
                        type: g,
                        value: d,
                        maskInputFn: u
                    })), v(t, h ? {
                        text: d,
                        isChecked: p,
                        userTriggered: n
                    } : {
                        text: d,
                        isChecked: p
                    });
                    var f = t.name;
                    "radio" === g && f && p && r.querySelectorAll('input[type="radio"][name="'.concat(f, '"]')).forEach((e => {
                        if (e !== t) {
                            var n = e.value;
                            v(e, h ? {
                                text: n,
                                isChecked: !p,
                                userTriggered: !1
                            } : {
                                text: n,
                                isChecked: !p
                            })
                        }
                    }))
                }
            }

            function v(e, r) {
                var o = st.get(e);
                if (!o || o.text !== r.text || o.isChecked !== r.isChecked) {
                    st.set(e, r);
                    var s = i.getId(e);
                    Qe(n)(t(t({}, r), {}, {
                        id: s
                    }))
                }
            }
            var g = ("last" === d.input ? ["change"] : ["input", "change"]).map((e => fe(e, Qe(p), r))),
                f = r.defaultView;
            if (!f) return () => {
                g.forEach((e => e()))
            };
            var m = f.Object.getOwnPropertyDescriptor(f.HTMLInputElement.prototype, "value"),
                _ = [
                    [f.HTMLInputElement.prototype, "value"],
                    [f.HTMLInputElement.prototype, "checked"],
                    [f.HTMLSelectElement.prototype, "value"],
                    [f.HTMLTextAreaElement.prototype, "value"],
                    [f.HTMLSelectElement.prototype, "selectedIndex"],
                    [f.HTMLOptionElement.prototype, "selected"]
                ];
            return m && m.set && g.push(..._.map((e => be(e[0], e[1], {
                set() {
                    Qe(p)({
                        target: this,
                        isTrusted: !1
                    })
                }
            }, !1, f)))), Qe((() => {
                g.forEach((e => e()))
            }))
        }(e),
        u = function(e) {
            var {
                mediaInteractionCb: t,
                blockClass: n,
                blockSelector: r,
                mirror: i,
                sampling: o,
                doc: s
            } = e, a = Qe((e => ye(Qe((o => {
                var s = tt(o);
                if (s && !xe(s, n, r, !0)) {
                    var {
                        currentTime: a,
                        volume: l,
                        muted: c,
                        playbackRate: u,
                        loop: d
                    } = s;
                    t({
                        type: e,
                        id: i.getId(s),
                        currentTime: a,
                        volume: l,
                        muted: c,
                        playbackRate: u,
                        loop: d
                    })
                }
            })), o.media || 500))), l = [fe("play", a(Ve.Play), s), fe("pause", a(Ve.Pause), s), fe("seeked", a(Ve.Seeked), s), fe("volumechange", a(Ve.VolumeChange), s), fe("ratechange", a(Ve.RateChange), s)];
            return Qe((() => {
                l.forEach((e => e()))
            }))
        }(e),
        d = () => {},
        h = () => {},
        p = () => {},
        v = () => {};
    e.recordDOM && (d = function(e, t) {
        var {
            styleSheetRuleCb: n,
            mirror: r,
            stylesheetManager: i
        } = e, {
            win: o
        } = t;
        if (!o.CSSStyleSheet || !o.CSSStyleSheet.prototype) return () => {};
        var s = o.CSSStyleSheet.prototype.insertRule;
        o.CSSStyleSheet.prototype.insertRule = new Proxy(s, {
            apply: Qe(((e, t, o) => {
                var [s, a] = o, {
                    id: l,
                    styleId: c
                } = lt(t, r, i.styleMirror);
                return (l && -1 !== l || c && -1 !== c) && n({
                    id: l,
                    styleId: c,
                    adds: [{
                        rule: s,
                        index: a
                    }]
                }), e.apply(t, o)
            }))
        }), o.CSSStyleSheet.prototype.addRule = function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this.cssRules.length,
                r = "".concat(e, " { ").concat(t, " }");
            return o.CSSStyleSheet.prototype.insertRule.apply(this, [r, n])
        };
        var a, l, c = o.CSSStyleSheet.prototype.deleteRule;
        o.CSSStyleSheet.prototype.deleteRule = new Proxy(c, {
            apply: Qe(((e, t, o) => {
                var [s] = o, {
                    id: a,
                    styleId: l
                } = lt(t, r, i.styleMirror);
                return (a && -1 !== a || l && -1 !== l) && n({
                    id: a,
                    styleId: l,
                    removes: [{
                        index: s
                    }]
                }), e.apply(t, o)
            }))
        }), o.CSSStyleSheet.prototype.removeRule = function(e) {
            return o.CSSStyleSheet.prototype.deleteRule.apply(this, [e])
        }, o.CSSStyleSheet.prototype.replace && (a = o.CSSStyleSheet.prototype.replace, o.CSSStyleSheet.prototype.replace = new Proxy(a, {
            apply: Qe(((e, t, o) => {
                var [s] = o, {
                    id: a,
                    styleId: l
                } = lt(t, r, i.styleMirror);
                return (a && -1 !== a || l && -1 !== l) && n({
                    id: a,
                    styleId: l,
                    replace: s
                }), e.apply(t, o)
            }))
        })), o.CSSStyleSheet.prototype.replaceSync && (l = o.CSSStyleSheet.prototype.replaceSync, o.CSSStyleSheet.prototype.replaceSync = new Proxy(l, {
            apply: Qe(((e, t, o) => {
                var [s] = o, {
                    id: a,
                    styleId: l
                } = lt(t, r, i.styleMirror);
                return (a && -1 !== a || l && -1 !== l) && n({
                    id: a,
                    styleId: l,
                    replaceSync: s
                }), e.apply(t, o)
            }))
        }));
        var u = {};
        ht("CSSGroupingRule") ? u.CSSGroupingRule = o.CSSGroupingRule : (ht("CSSMediaRule") && (u.CSSMediaRule = o.CSSMediaRule), ht("CSSConditionRule") && (u.CSSConditionRule = o.CSSConditionRule), ht("CSSSupportsRule") && (u.CSSSupportsRule = o.CSSSupportsRule));
        var d = {};
        return Object.entries(u).forEach((e => {
            var [t, o] = e;
            d[t] = {
                insertRule: o.prototype.insertRule,
                deleteRule: o.prototype.deleteRule
            }, o.prototype.insertRule = new Proxy(d[t].insertRule, {
                apply: Qe(((e, t, o) => {
                    var [s, a] = o, {
                        id: l,
                        styleId: c
                    } = lt(t.parentStyleSheet, r, i.styleMirror);
                    return (l && -1 !== l || c && -1 !== c) && n({
                        id: l,
                        styleId: c,
                        adds: [{
                            rule: s,
                            index: [...at(t), a || 0]
                        }]
                    }), e.apply(t, o)
                }))
            }), o.prototype.deleteRule = new Proxy(d[t].deleteRule, {
                apply: Qe(((e, t, o) => {
                    var [s] = o, {
                        id: a,
                        styleId: l
                    } = lt(t.parentStyleSheet, r, i.styleMirror);
                    return (a && -1 !== a || l && -1 !== l) && n({
                        id: a,
                        styleId: l,
                        removes: [{
                            index: [...at(t), s]
                        }]
                    }), e.apply(t, o)
                }))
            })
        })), Qe((() => {
            o.CSSStyleSheet.prototype.insertRule = s, o.CSSStyleSheet.prototype.deleteRule = c, a && (o.CSSStyleSheet.prototype.replace = a), l && (o.CSSStyleSheet.prototype.replaceSync = l), Object.entries(u).forEach((e => {
                var [t, n] = e;
                n.prototype.insertRule = d[t].insertRule, n.prototype.deleteRule = d[t].deleteRule
            }))
        }))
    }(e, {
        win: i
    }), h = ct(e, e.doc), p = function(e, t) {
        var {
            styleDeclarationCb: n,
            mirror: r,
            ignoreCSSAttributes: i,
            stylesheetManager: o
        } = e, {
            win: s
        } = t, a = s.CSSStyleDeclaration.prototype.setProperty;
        s.CSSStyleDeclaration.prototype.setProperty = new Proxy(a, {
            apply: Qe(((e, t, s) => {
                var l, [c, u, d] = s;
                if (i.has(c)) return a.apply(t, [c, u, d]);
                var {
                    id: h,
                    styleId: p
                } = lt(null == (l = t.parentRule) ? void 0 : l.parentStyleSheet, r, o.styleMirror);
                return (h && -1 !== h || p && -1 !== p) && n({
                    id: h,
                    styleId: p,
                    set: {
                        property: c,
                        value: u,
                        priority: d
                    },
                    index: at(t.parentRule)
                }), e.apply(t, s)
            }))
        });
        var l = s.CSSStyleDeclaration.prototype.removeProperty;
        return s.CSSStyleDeclaration.prototype.removeProperty = new Proxy(l, {
            apply: Qe(((e, t, s) => {
                var a, [c] = s;
                if (i.has(c)) return l.apply(t, [c]);
                var {
                    id: u,
                    styleId: d
                } = lt(null == (a = t.parentRule) ? void 0 : a.parentStyleSheet, r, o.styleMirror);
                return (u && -1 !== u || d && -1 !== d) && n({
                    id: u,
                    styleId: d,
                    remove: {
                        property: c
                    },
                    index: at(t.parentRule)
                }), e.apply(t, s)
            }))
        }), Qe((() => {
            s.CSSStyleDeclaration.prototype.setProperty = a, s.CSSStyleDeclaration.prototype.removeProperty = l
        }))
    }(e, {
        win: i
    }), e.collectFonts && (v = function(e) {
        var {
            fontCb: t,
            doc: n
        } = e, r = n.defaultView;
        if (!r) return () => {};
        var i = [],
            o = new WeakMap,
            s = r.FontFace;
        r.FontFace = function(e, t, n) {
            var r = new s(e, t, n);
            return o.set(r, {
                family: e,
                buffer: "string" != typeof t,
                descriptors: n,
                fontSource: "string" == typeof t ? t : JSON.stringify(Array.from(new Uint8Array(t)))
            }), r
        };
        var a = we(n.fonts, "add", (function(e) {
            return function(n) {
                return setTimeout(Qe((() => {
                    var e = o.get(n);
                    e && (t(e), o.delete(n))
                })), 0), e.apply(this, [n])
            }
        }));
        return i.push((() => {
            r.FontFace = s
        })), i.push(a), Qe((() => {
            i.forEach((e => e()))
        }))
    }(e)));
    var g = function(e) {
            var {
                doc: t,
                mirror: n,
                blockClass: r,
                blockSelector: i,
                selectionCb: o
            } = e, s = !0, a = Qe((() => {
                var e = t.getSelection();
                if (!(!e || s && (null == e ? void 0 : e.isCollapsed))) {
                    s = e.isCollapsed || !1;
                    for (var a = [], l = e.rangeCount || 0, c = 0; c < l; c++) {
                        var u = e.getRangeAt(c),
                            {
                                startContainer: d,
                                startOffset: h,
                                endContainer: p,
                                endOffset: v
                            } = u;
                        xe(d, r, i, !0) || xe(p, r, i, !0) || a.push({
                            start: n.getId(d),
                            startOffset: h,
                            end: n.getId(p),
                            endOffset: v
                        })
                    }
                    o({
                        ranges: a
                    })
                }
            }));
            return a(), fe("selectionchange", a)
        }(e),
        f = function(e) {
            var {
                doc: t,
                customElementCb: n
            } = e, r = t.defaultView;
            if (!r || !r.customElements) return () => {};
            var i = we(r.customElements, "define", (function(e) {
                return function(t, r, i) {
                    try {
                        n({
                            define: {
                                name: t
                            }
                        })
                    } catch (e) {
                        console.warn("Custom element callback failed for ".concat(t))
                    }
                    return e.apply(this, [t, r, i])
                }
            }));
            return i
        }(e),
        m = [];
    for (var _ of e.plugins) m.push(_.observer(_.callback, i, _.options));
    return Qe((() => {
        et.forEach((e => e.reset())), null == n || n.disconnect(), o(), s(), a(), l(), c(), u(), d(), h(), p(), v(), g(), f(), m.forEach((e => e()))
    }))
}

function dt(e) {
    return void 0 !== window[e]
}

function ht(e) {
    return Boolean(void 0 !== window[e] && window[e].prototype && "insertRule" in window[e].prototype && "deleteRule" in window[e].prototype)
}
class pt {
    constructor(e) {
        c(this, "iframeIdToRemoteIdMap", new WeakMap), c(this, "iframeRemoteIdToIdMap", new WeakMap), this.generateIdFn = e
    }
    getId(e, t, n, r) {
        var i = n || this.getIdToRemoteIdMap(e),
            o = r || this.getRemoteIdToIdMap(e),
            s = i.get(t);
        return s || (s = this.generateIdFn(), i.set(t, s), o.set(s, t)), s
    }
    getIds(e, t) {
        var n = this.getIdToRemoteIdMap(e),
            r = this.getRemoteIdToIdMap(e);
        return t.map((t => this.getId(e, t, n, r)))
    }
    getRemoteId(e, t, n) {
        var r = n || this.getRemoteIdToIdMap(e);
        if ("number" != typeof t) return t;
        var i = r.get(t);
        return i || -1
    }
    getRemoteIds(e, t) {
        var n = this.getRemoteIdToIdMap(e);
        return t.map((t => this.getRemoteId(e, t, n)))
    }
    reset(e) {
        if (!e) return this.iframeIdToRemoteIdMap = new WeakMap, void(this.iframeRemoteIdToIdMap = new WeakMap);
        this.iframeIdToRemoteIdMap.delete(e), this.iframeRemoteIdToIdMap.delete(e)
    }
    getIdToRemoteIdMap(e) {
        var t = this.iframeIdToRemoteIdMap.get(e);
        return t || (t = new Map, this.iframeIdToRemoteIdMap.set(e, t)), t
    }
    getRemoteIdToIdMap(e) {
        var t = this.iframeRemoteIdToIdMap.get(e);
        return t || (t = new Map, this.iframeRemoteIdToIdMap.set(e, t)), t
    }
}
class vt {
    constructor(e) {
        c(this, "iframes", new WeakMap), c(this, "crossOriginIframeMap", new WeakMap), c(this, "crossOriginIframeMirror", new pt(G)), c(this, "crossOriginIframeStyleMirror"), c(this, "crossOriginIframeRootIdMap", new WeakMap), c(this, "mirror"), c(this, "mutationCb"), c(this, "wrappedEmit"), c(this, "loadListener"), c(this, "stylesheetManager"), c(this, "recordCrossOriginIframes"), this.mutationCb = e.mutationCb, this.wrappedEmit = e.wrappedEmit, this.stylesheetManager = e.stylesheetManager, this.recordCrossOriginIframes = e.recordCrossOriginIframes, this.crossOriginIframeStyleMirror = new pt(this.stylesheetManager.styleMirror.generateId.bind(this.stylesheetManager.styleMirror)), this.mirror = e.mirror, this.recordCrossOriginIframes && window.addEventListener("message", this.handleMessage.bind(this))
    }
    addIframe(e) {
        this.iframes.set(e, !0), e.contentWindow && this.crossOriginIframeMap.set(e.contentWindow, e)
    }
    addLoadListener(e) {
        this.loadListener = e
    }
    attachIframe(e, t) {
        var n, r;
        this.mutationCb({
            adds: [{
                parentId: this.mirror.getId(e),
                nextId: null,
                node: t
            }],
            removes: [],
            texts: [],
            attributes: [],
            isAttachIframe: !0
        }), this.recordCrossOriginIframes && (null == (n = e.contentWindow) || n.addEventListener("message", this.handleMessage.bind(this))), null == (r = this.loadListener) || r.call(this, e), e.contentDocument && e.contentDocument.adoptedStyleSheets && e.contentDocument.adoptedStyleSheets.length > 0 && this.stylesheetManager.adoptStyleSheets(e.contentDocument.adoptedStyleSheets, this.mirror.getId(e.contentDocument))
    }
    handleMessage(e) {
        var t = e;
        if ("rrweb" === t.data.type && t.origin === t.data.origin && e.source) {
            var n = this.crossOriginIframeMap.get(e.source);
            if (n) {
                var r = this.transformCrossOriginEvent(n, t.data.event);
                r && this.wrappedEmit(r, t.data.isCheckout)
            }
        }
    }
    transformCrossOriginEvent(e, t) {
        var n;
        switch (t.type) {
            case Be.FullSnapshot:
                this.crossOriginIframeMirror.reset(e), this.crossOriginIframeStyleMirror.reset(e), this.replaceIdOnNode(t.data.node, e);
                var r = t.data.node.id;
                return this.crossOriginIframeRootIdMap.set(e, r), this.patchRootIdOnNode(t.data.node, r), {
                    timestamp: t.timestamp,
                    type: Be.IncrementalSnapshot,
                    data: {
                        source: qe.Mutation,
                        adds: [{
                            parentId: this.mirror.getId(e),
                            nextId: null,
                            node: t.data.node
                        }],
                        removes: [],
                        texts: [],
                        attributes: [],
                        isAttachIframe: !0
                    }
                };
            case Be.Meta:
            case Be.Load:
            case Be.DomContentLoaded:
                return !1;
            case Be.Plugin:
                return t;
            case Be.Custom:
                return this.replaceIds(t.data.payload, e, ["id", "parentId", "previousId", "nextId"]), t;
            case Be.IncrementalSnapshot:
                switch (t.data.source) {
                    case qe.Mutation:
                        return t.data.adds.forEach((t => {
                            this.replaceIds(t, e, ["parentId", "nextId", "previousId"]), this.replaceIdOnNode(t.node, e);
                            var n = this.crossOriginIframeRootIdMap.get(e);
                            n && this.patchRootIdOnNode(t.node, n)
                        })), t.data.removes.forEach((t => {
                            this.replaceIds(t, e, ["parentId", "id"])
                        })), t.data.attributes.forEach((t => {
                            this.replaceIds(t, e, ["id"])
                        })), t.data.texts.forEach((t => {
                            this.replaceIds(t, e, ["id"])
                        })), t;
                    case qe.Drag:
                    case qe.TouchMove:
                    case qe.MouseMove:
                        return t.data.positions.forEach((t => {
                            this.replaceIds(t, e, ["id"])
                        })), t;
                    case qe.ViewportResize:
                        return !1;
                    case qe.MediaInteraction:
                    case qe.MouseInteraction:
                    case qe.Scroll:
                    case qe.CanvasMutation:
                    case qe.Input:
                        return this.replaceIds(t.data, e, ["id"]), t;
                    case qe.StyleSheetRule:
                    case qe.StyleDeclaration:
                        return this.replaceIds(t.data, e, ["id"]), this.replaceStyleIds(t.data, e, ["styleId"]), t;
                    case qe.Font:
                        return t;
                    case qe.Selection:
                        return t.data.ranges.forEach((t => {
                            this.replaceIds(t, e, ["start", "end"])
                        })), t;
                    case qe.AdoptedStyleSheet:
                        return this.replaceIds(t.data, e, ["id"]), this.replaceStyleIds(t.data, e, ["styleIds"]), null == (n = t.data.styles) || n.forEach((t => {
                            this.replaceStyleIds(t, e, ["styleId"])
                        })), t
                }
        }
        return !1
    }
    replace(e, t, n, r) {
        for (var i of r)(Array.isArray(t[i]) || "number" == typeof t[i]) && (Array.isArray(t[i]) ? t[i] = e.getIds(n, t[i]) : t[i] = e.getId(n, t[i]));
        return t
    }
    replaceIds(e, t, n) {
        return this.replace(this.crossOriginIframeMirror, e, t, n)
    }
    replaceStyleIds(e, t, n) {
        return this.replace(this.crossOriginIframeStyleMirror, e, t, n)
    }
    replaceIdOnNode(e, t) {
        this.replaceIds(e, t, ["id", "rootId"]), "childNodes" in e && e.childNodes.forEach((e => {
            this.replaceIdOnNode(e, t)
        }))
    }
    patchRootIdOnNode(e, t) {
        e.type === h.Document || e.rootId || (e.rootId = t), "childNodes" in e && e.childNodes.forEach((e => {
            this.patchRootIdOnNode(e, t)
        }))
    }
}
class gt {
    constructor(e) {
        c(this, "shadowDoms", new WeakSet), c(this, "mutationCb"), c(this, "scrollCb"), c(this, "bypassOptions"), c(this, "mirror"), c(this, "restoreHandlers", []), this.mutationCb = e.mutationCb, this.scrollCb = e.scrollCb, this.bypassOptions = e.bypassOptions, this.mirror = e.mirror, this.init()
    }
    init() {
        this.reset(), this.patchAttachShadow(Element, document)
    }
    addShadowRoot(e, n) {
        if (k(e) && !this.shadowDoms.has(e)) {
            this.shadowDoms.add(e);
            var r = nt(t(t({}, this.bypassOptions), {}, {
                doc: n,
                mutationCb: this.mutationCb,
                mirror: this.mirror,
                shadowDomManager: this
            }), e);
            this.restoreHandlers.push((() => r.disconnect())), this.restoreHandlers.push(it(t(t({}, this.bypassOptions), {}, {
                scrollCb: this.scrollCb,
                doc: e,
                mirror: this.mirror
            }))), setTimeout((() => {
                e.adoptedStyleSheets && e.adoptedStyleSheets.length > 0 && this.bypassOptions.stylesheetManager.adoptStyleSheets(e.adoptedStyleSheets, this.mirror.getId(ge.host(e))), this.restoreHandlers.push(ct({
                    mirror: this.mirror,
                    stylesheetManager: this.bypassOptions.stylesheetManager
                }, e))
            }), 0)
        }
    }
    observeAttachShadow(e) {
        e.contentWindow && e.contentDocument && this.patchAttachShadow(e.contentWindow.Element, e.contentDocument)
    }
    patchAttachShadow(e, t) {
        var n = this;
        this.restoreHandlers.push(we(e.prototype, "attachShadow", (function(e) {
            return function(r) {
                var i = e.call(this, r),
                    o = ge.shadowRoot(this);
                return o && De(this) && n.addShadowRoot(o, t), i
            }
        })))
    }
    reset() {
        this.restoreHandlers.forEach((e => {
            try {
                e()
            } catch (e) {}
        })), this.restoreHandlers = [], this.shadowDoms = new WeakSet
    }
}
for (var ft = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", mt = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), _t = 0; _t < 64; _t++) mt[ft.charCodeAt(_t)] = _t;
var yt = new Map;
var bt = (e, t, n) => {
    if (e && (Ct(e, t) || "object" == typeof e)) {
        var r = function(e, t) {
                var n = yt.get(e);
                return n || (n = new Map, yt.set(e, n)), n.has(t) || n.set(t, []), n.get(t)
            }(n, e.constructor.name),
            i = r.indexOf(e);
        return -1 === i && (i = r.length, r.push(e)), i
    }
};

function wt(e, t, n) {
    if (e instanceof Array) return e.map((e => wt(e, t, n)));
    if (null === e) return e;
    if (e instanceof Float32Array || e instanceof Float64Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Uint8Array || e instanceof Uint16Array || e instanceof Int16Array || e instanceof Int8Array || e instanceof Uint8ClampedArray) return {
        rr_type: e.constructor.name,
        args: [Object.values(e)]
    };
    if (e instanceof ArrayBuffer) return {
        rr_type: e.constructor.name,
        base64: function(e) {
            var t, n = new Uint8Array(e),
                r = n.length,
                i = "";
            for (t = 0; t < r; t += 3) i += ft[n[t] >> 2], i += ft[(3 & n[t]) << 4 | n[t + 1] >> 4], i += ft[(15 & n[t + 1]) << 2 | n[t + 2] >> 6], i += ft[63 & n[t + 2]];
            return r % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : r % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="), i
        }(e)
    };
    if (e instanceof DataView) return {
        rr_type: e.constructor.name,
        args: [wt(e.buffer, t, n), e.byteOffset, e.byteLength]
    };
    if (e instanceof HTMLImageElement) {
        var r = e.constructor.name,
            {
                src: i
            } = e;
        return {
            rr_type: r,
            src: i
        }
    }
    if (e instanceof HTMLCanvasElement) {
        return {
            rr_type: "HTMLImageElement",
            src: e.toDataURL()
        }
    }
    return e instanceof ImageData ? {
        rr_type: e.constructor.name,
        args: [wt(e.data, t, n), e.width, e.height]
    } : Ct(e, t) || "object" == typeof e ? {
        rr_type: e.constructor.name,
        index: bt(e, t, n)
    } : e
}
var St = (e, t, n) => e.map((e => wt(e, t, n))),
    Ct = (e, t) => {
        var n = ["WebGLActiveInfo", "WebGLBuffer", "WebGLFramebuffer", "WebGLProgram", "WebGLRenderbuffer", "WebGLShader", "WebGLShaderPrecisionFormat", "WebGLTexture", "WebGLUniformLocation", "WebGLVertexArrayObject", "WebGLVertexArrayObjectOES"].filter((e => "function" == typeof t[e]));
        return Boolean(n.find((n => e instanceof t[n])))
    };

function It(e, t, n, r) {
    var i = [];
    try {
        var o = we(e.HTMLCanvasElement.prototype, "getContext", (function(e) {
            return function(i) {
                for (var o = arguments.length, s = new Array(o > 1 ? o - 1 : 0), a = 1; a < o; a++) s[a - 1] = arguments[a];
                if (!xe(this, t, n, !0)) {
                    var l = function(e) {
                        return "experimental-webgl" === e ? "webgl" : e
                    }(i);
                    if ("__context" in this || (this.__context = l), r && ["webgl", "webgl2"].includes(l))
                        if (s[0] && "object" == typeof s[0]) {
                            var c = s[0];
                            c.preserveDrawingBuffer || (c.preserveDrawingBuffer = !0)
                        } else s.splice(0, 1, {
                            preserveDrawingBuffer: !0
                        })
                }
                return e.apply(this, [i, ...s])
            }
        }));
        i.push(o)
    } catch (e) {
        console.error("failed to patch HTMLCanvasElement.prototype.getContext")
    }
    return () => {
        i.forEach((e => e()))
    }
}

function kt(e, t, n, r, i, o) {
    var s = [],
        a = Object.getOwnPropertyNames(e),
        l = function(a) {
            if (["isContextLost", "canvas", "drawingBufferWidth", "drawingBufferHeight"].includes(a)) return "continue";
            try {
                if ("function" != typeof e[a]) return "continue";
                var l = we(e, a, (function(e) {
                    return function() {
                        for (var s = arguments.length, l = new Array(s), c = 0; c < s; c++) l[c] = arguments[c];
                        var u = e.apply(this, l);
                        if (bt(u, o, this), "tagName" in this.canvas && !xe(this.canvas, r, i, !0)) {
                            var d = St(l, o, this),
                                h = {
                                    type: t,
                                    property: a,
                                    args: d
                                };
                            n(this.canvas, h)
                        }
                        return u
                    }
                }));
                s.push(l)
            } catch (r) {
                var c = be(e, a, {
                    set(e) {
                        n(this.canvas, {
                            type: t,
                            property: a,
                            args: [e],
                            setter: !0
                        })
                    }
                });
                s.push(c)
            }
        };
    for (var c of a) l(c);
    return s
}
var Et, xt, Tt, Mt, 
Rt = `(function() {
  "use strict";
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }
  var encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer), i2, len = bytes.length, base64 = "";
    for (i2 = 0; i2 < len; i2 += 3) {
      base64 += chars[bytes[i2] >> 2];
      base64 += chars[(bytes[i2] & 3) << 4 | bytes[i2 + 1] >> 4];
      base64 += chars[(bytes[i2 + 1] & 15) << 2 | bytes[i2 + 2] >> 6];
      base64 += chars[bytes[i2 + 2] & 63];
    }
    if (len % 3 === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }
    return base64;
  };
  const lastBlobMap = /* @__PURE__ */ new Map();
  const transparentBlobMap = /* @__PURE__ */ new Map();
  async function getTransparentBlobFor(width, height, dataURLOptions) {
    const id = width + '-' + height;
    if ("OffscreenCanvas" in globalThis) {
      if (transparentBlobMap.has(id)) return transparentBlobMap.get(id);
      const offscreen = new OffscreenCanvas(width, height);
      offscreen.getContext("2d");
      const blob = await offscreen.convertToBlob(dataURLOptions);
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = encode(arrayBuffer);
      transparentBlobMap.set(id, base64);
      return base64;
    } else {
      return "";
    }
  }
  const worker = self;
  worker.onmessage = async function(e) {
    if ("OffscreenCanvas" in globalThis) {
      const { id, bitmap, width, height, dataURLOptions } = e.data;
      const transparentBase64 = getTransparentBlobFor(
        width,
        height,
        dataURLOptions
      );
      const offscreen = new OffscreenCanvas(width, height);
      const ctx = offscreen.getContext("2d");
      ctx.drawImage(bitmap, 0, 0);
      bitmap.close();
      const blob = await offscreen.convertToBlob(dataURLOptions);
      const type = blob.type;
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = encode(arrayBuffer);
      if (!lastBlobMap.has(id) && await transparentBase64 === base64) {
        lastBlobMap.set(id, base64);
        return worker.postMessage({ id });
      }
      if (lastBlobMap.get(id) === base64) return worker.postMessage({ id });
      worker.postMessage({
        id,
        type,
        base64,
        width,
        height
      });
      lastBlobMap.set(id, base64);
    } else {
      return worker.postMessage({ id: e.data.id });
    }
  };
})();
//# sourceMappingURL=image-bitmap-data-url-worker-IJpC7g_b.js.map
`,
    At = "undefined" != typeof window && window.Blob && new Blob([Rt], {
        type: "text/javascript;charset=utf-8"
    });

function Nt(e) {
    var t;
    try {
        if (!(t = At && (window.URL || window.webkitURL).createObjectURL(At))) throw "";
        var n = new Worker(t, {
            name: null == e ? void 0 : e.name
        });
        return n.addEventListener("error", (() => {
            (window.URL || window.webkitURL).revokeObjectURL(t)
        })), n
    } catch (t) {
        return new Worker("data:text/javascript;base64," + Rt, {
            name: null == e ? void 0 : e.name
        })
    } finally {
        t && (window.URL || window.webkitURL).revokeObjectURL(t)
    }
}
class Ft {
    constructor(e) {
        c(this, "pendingCanvasMutations", new Map), c(this, "rafStamps", {
            latestId: 0,
            invokeId: null
        }), c(this, "mirror"), c(this, "mutationCb"), c(this, "resetObservers"), c(this, "frozen", !1), c(this, "locked", !1), c(this, "processMutation", ((e, t) => {
            !(this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId) && this.rafStamps.invokeId || (this.rafStamps.invokeId = this.rafStamps.latestId), this.pendingCanvasMutations.has(e) || this.pendingCanvasMutations.set(e, []), this.pendingCanvasMutations.get(e).push(t)
        }));
        var {
            sampling: t = "all",
            win: n,
            blockClass: r,
            blockSelector: i,
            recordCanvas: o,
            dataURLOptions: s
        } = e;
        this.mutationCb = e.mutationCb, this.mirror = e.mirror, o && "all" === t && this.initCanvasMutationObserver(n, r, i), o && "number" == typeof t && this.initCanvasFPSObserver(t, n, r, i, {
            dataURLOptions: s
        })
    }
    reset() {
        this.pendingCanvasMutations.clear(), this.resetObservers && this.resetObservers()
    }
    freeze() {
        this.frozen = !0
    }
    unfreeze() {
        this.frozen = !1
    }
    lock() {
        this.locked = !0
    }
    unlock() {
        this.locked = !1
    }
    initCanvasFPSObserver(e, t, n, i, o) {
        var s = this,
            a = It(t, n, i, !0),
            l = new Map,
            c = new Nt;
        c.onmessage = e => {
            var {
                id: t
            } = e.data;
            if (l.set(t, !1), "base64" in e.data) {
                var {
                    base64: n,
                    type: r,
                    width: i,
                    height: o
                } = e.data;
                this.mutationCb({
                    id: t,
                    type: We["2D"],
                    commands: [{
                        property: "clearRect",
                        args: [0, 0, i, o]
                    }, {
                        property: "drawImage",
                        args: [{
                            rr_type: "ImageBitmap",
                            args: [{
                                rr_type: "Blob",
                                data: [{
                                    rr_type: "ArrayBuffer",
                                    base64: n
                                }],
                                type: r
                            }]
                        }, 0, 0]
                    }]
                })
            }
        };
        var u, d = 1e3 / e,
            h = 0,
            p = e => {
                var a, v;
                h && e - h < d ? u = requestAnimationFrame(p) : (h = e, (a = [], v = e => {
                    e.querySelectorAll("canvas").forEach((e => {
                        xe(e, n, i, !0) || a.push(e)
                    })), e.querySelectorAll("*").forEach((e => {
                        e.shadowRoot && v(e.shadowRoot)
                    }))
                }, v(t.document), a).forEach(function() {
                    var e = r((function*(e) {
                        var t, n = s.mirror.getId(e);
                        if (!l.get(n) && 0 !== e.width && 0 !== e.height) {
                            if (l.set(n, !0), ["webgl", "webgl2"].includes(e.__context)) {
                                var r = e.getContext(e.__context);
                                !1 === (null == (t = null == r ? void 0 : r.getContextAttributes()) ? void 0 : t.preserveDrawingBuffer) && r.clear(r.COLOR_BUFFER_BIT)
                            }
                            var i = e.clientWidth || e.width,
                                a = e.clientHeight || e.height,
                                u = yield createImageBitmap(e, {
                                    resizeWidth: i,
                                    resizeHeight: a
                                });
                            c.postMessage({
                                id: n,
                                bitmap: u,
                                width: i,
                                height: a,
                                dataURLOptions: o.dataURLOptions
                            }, [u])
                        }
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }()), u = requestAnimationFrame(p))
            };
        u = requestAnimationFrame(p), this.resetObservers = () => {
            a(), cancelAnimationFrame(u)
        }
    }
    initCanvasMutationObserver(e, t, n) {
        this.startRAFTimestamping(), this.startPendingCanvasMutationFlusher();
        var r = It(e, t, n, !1),
            i = function(e, t, n, r) {
                var i = [],
                    o = Object.getOwnPropertyNames(t.CanvasRenderingContext2D.prototype),
                    s = function(o) {
                        try {
                            if ("function" != typeof t.CanvasRenderingContext2D.prototype[o]) return "continue";
                            var s = we(t.CanvasRenderingContext2D.prototype, o, (function(i) {
                                return function() {
                                    for (var s = arguments.length, a = new Array(s), l = 0; l < s; l++) a[l] = arguments[l];
                                    return xe(this.canvas, n, r, !0) || setTimeout((() => {
                                        var n = St(a, t, this);
                                        e(this.canvas, {
                                            type: We["2D"],
                                            property: o,
                                            args: n
                                        })
                                    }), 0), i.apply(this, a)
                                }
                            }));
                            i.push(s)
                        } catch (n) {
                            var a = be(t.CanvasRenderingContext2D.prototype, o, {
                                set(t) {
                                    e(this.canvas, {
                                        type: We["2D"],
                                        property: o,
                                        args: [t],
                                        setter: !0
                                    })
                                }
                            });
                            i.push(a)
                        }
                    };
                for (var a of o) s(a);
                return () => {
                    i.forEach((e => e()))
                }
            }(this.processMutation.bind(this), e, t, n),
            o = function(e, t, n, r) {
                var i = [];
                return i.push(...kt(t.WebGLRenderingContext.prototype, We.WebGL, e, n, r, t)), void 0 !== t.WebGL2RenderingContext && i.push(...kt(t.WebGL2RenderingContext.prototype, We.WebGL2, e, n, r, t)), () => {
                    i.forEach((e => e()))
                }
            }(this.processMutation.bind(this), e, t, n);
        this.resetObservers = () => {
            r(), i(), o()
        }
    }
    startPendingCanvasMutationFlusher() {
        requestAnimationFrame((() => this.flushPendingCanvasMutations()))
    }
    startRAFTimestamping() {
        var e = t => {
            this.rafStamps.latestId = t, requestAnimationFrame(e)
        };
        requestAnimationFrame(e)
    }
    flushPendingCanvasMutations() {
        this.pendingCanvasMutations.forEach(((e, t) => {
            var n = this.mirror.getId(t);
            this.flushPendingCanvasMutationFor(t, n)
        })), requestAnimationFrame((() => this.flushPendingCanvasMutations()))
    }
    flushPendingCanvasMutationFor(e, t) {
        if (!this.frozen && !this.locked) {
            var n = this.pendingCanvasMutations.get(e);
            if (n && -1 !== t) {
                var r = n.map((e => o(e, a))),
                    {
                        type: i
                    } = n[0];
                this.mutationCb({
                    id: t,
                    type: i,
                    commands: r
                }), this.pendingCanvasMutations.delete(e)
            }
        }
    }
}
class Ot {
    constructor(e) {
        c(this, "trackedLinkElements", new WeakSet), c(this, "mutationCb"), c(this, "adoptedStyleSheetCb"), c(this, "styleMirror", new Oe), this.mutationCb = e.mutationCb, this.adoptedStyleSheetCb = e.adoptedStyleSheetCb
    }
    attachLinkElement(e, t) {
        "_cssText" in t.attributes && this.mutationCb({
            adds: [],
            removes: [],
            texts: [],
            attributes: [{
                id: t.id,
                attributes: t.attributes
            }]
        }), this.trackLinkElement(e)
    }
    trackLinkElement(e) {
        this.trackedLinkElements.has(e) || (this.trackedLinkElements.add(e), this.trackStylesheetInLinkElement(e))
    }
    adoptStyleSheets(e, t) {
        var n = this;
        if (0 !== e.length) {
            var r = {
                    id: t,
                    styleIds: []
                },
                i = [],
                o = function(e) {
                    var t = void 0;
                    n.styleMirror.has(e) ? t = n.styleMirror.getId(e) : (t = n.styleMirror.add(e), i.push({
                        styleId: t,
                        rules: Array.from(e.rules || CSSRule, ((t, n) => ({
                            rule: x(t, e.href),
                            index: n
                        })))
                    })), r.styleIds.push(t)
                };
            for (var s of e) o(s);
            i.length > 0 && (r.styles = i), this.adoptedStyleSheetCb(r)
        }
    }
    reset() {
        this.styleMirror.reset(), this.trackedLinkElements = new WeakSet
    }
    trackStylesheetInLinkElement(e) {}
}
class Pt {
    constructor() {
        c(this, "nodeMap", new WeakMap), c(this, "active", !1)
    }
    inOtherBuffer(e, t) {
        var n = this.nodeMap.get(e);
        return n && Array.from(n).some((e => e !== t))
    }
    add(e, t) {
        this.active || (this.active = !0, requestAnimationFrame((() => {
            this.nodeMap = new WeakMap, this.active = !1
        }))), this.nodeMap.set(e, (this.nodeMap.get(e) || new Set).add(t))
    }
    destroy() {}
}
var Lt = !1;
try {
    if (2 !== Array.from([1], (e => 2 * e))[0]) {
        var Dt = document.createElement("iframe");
        document.body.appendChild(Dt), Array.from = (null == (s = Dt.contentWindow) ? void 0 : s.Array.from) || Array.from, document.body.removeChild(Dt)
    }
} catch (e) {
    console.debug("Unable to override Array.from", e)
}
var Bt, qt, Ht = new M;

function $t() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        {
            emit: n,
            checkoutEveryNms: r,
            checkoutEveryNth: i,
            blockClass: o = "rr-block",
            blockSelector: s = null,
            ignoreClass: a = "rr-ignore",
            ignoreSelector: l = null,
            maskTextClass: c = "rr-mask",
            maskTextSelector: u = null,
            inlineStylesheet: d = !0,
            maskAllInputs: h,
            maskInputOptions: p,
            slimDOMOptions: v,
            maskInputFn: g,
            maskTextFn: f,
            hooks: m,
            packFn: _,
            sampling: y = {},
            dataURLOptions: b = {},
            mousemoveWait: w,
            recordDOM: S = !0,
            recordCanvas: C = !1,
            recordCrossOriginIframes: I = !1,
            recordAfter: k = ("DOMContentLoaded" === e.recordAfter ? e.recordAfter : "load"),
            userTriggeredOnInput: E = !1,
            collectFonts: x = !1,
            inlineImages: T = !1,
            plugins: R,
            keepIframeSrcFn: A = (() => !1),
            ignoreCSSAttributes: N = new Set([]),
            errorHandler: F
        } = e;
    Ue = F;
    var O = !I || window.parent === window,
        P = !1;
    if (!O) try {
        window.parent.document && (P = !1)
    } catch (e) {
        P = !0
    }
    if (O && !n) throw new Error("emit function is required");
    if (!O && !P) return () => {};
    void 0 !== w && void 0 === y.mousemove && (y.mousemove = w), Ht.reset();
    var L, D = !0 === h ? {
            color: !0,
            date: !0,
            "datetime-local": !0,
            email: !0,
            month: !0,
            number: !0,
            range: !0,
            search: !0,
            tel: !0,
            text: !0,
            time: !0,
            url: !0,
            week: !0,
            textarea: !0,
            select: !0,
            password: !0
        } : void 0 !== p ? p : {
            password: !0
        },
        B = !0 === v || "all" === v ? {
            script: !0,
            comment: !0,
            headFavicon: !0,
            headWhitespace: !0,
            headMetaSocial: !0,
            headMetaRobots: !0,
            headMetaHttpEquiv: !0,
            headMetaVerification: !0,
            headMetaAuthorship: "all" === v,
            headMetaDescKeywords: "all" === v,
            headTitleMutations: "all" === v
        } : v || {};
    ! function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
        "NodeList" in e && !e.NodeList.prototype.forEach && (e.NodeList.prototype.forEach = Array.prototype.forEach), "DOMTokenList" in e && !e.DOMTokenList.prototype.forEach && (e.DOMTokenList.prototype.forEach = Array.prototype.forEach)
    }();
    var q = 0,
        H = e => {
            for (var t of R || []) t.eventProcessor && (e = t.eventProcessor(e));
            return _ && !P && (e = _(e)), e
        };
    xt = (e, t) => {
        var o, s = e;
        if (s.timestamp = Se(), !(null == (o = et[0]) ? void 0 : o.isFrozen()) || s.type === Be.FullSnapshot || s.type === Be.IncrementalSnapshot && s.data.source === qe.Mutation || et.forEach((e => e.unfreeze())), O) null == n || n(H(s), t);
        else if (P) {
            var a = {
                type: "rrweb",
                event: H(s),
                origin: window.location.origin,
                isCheckout: t
            };
            window.parent.postMessage(a, "*")
        }
        if (s.type === Be.FullSnapshot) L = s, q = 0;
        else if (s.type === Be.IncrementalSnapshot) {
            if (s.data.source === qe.Mutation && s.data.isAttachIframe) return;
            q++;
            var l = i && q >= i,
                c = r && s.timestamp - L.timestamp > r;
            (l || c) && Tt(!0)
        }
    };
    var $ = e => {
            xt({
                type: Be.IncrementalSnapshot,
                data: t({
                    source: qe.Mutation
                }, e)
            })
        },
        W = e => xt({
            type: Be.IncrementalSnapshot,
            data: t({
                source: qe.Scroll
            }, e)
        }),
        V = e => xt({
            type: Be.IncrementalSnapshot,
            data: t({
                source: qe.CanvasMutation
            }, e)
        }),
        Z = new Ot({
            mutationCb: $,
            adoptedStyleSheetCb: e => xt({
                type: Be.IncrementalSnapshot,
                data: t({
                    source: qe.AdoptedStyleSheet
                }, e)
            })
        }),
        G = new vt({
            mirror: Ht,
            mutationCb: $,
            stylesheetManager: Z,
            recordCrossOriginIframes: I,
            wrappedEmit: xt
        });
    for (var U of R || []) U.getMirror && U.getMirror({
        nodeMirror: Ht,
        crossOriginIframeMirror: G.crossOriginIframeMirror,
        crossOriginIframeStyleMirror: G.crossOriginIframeStyleMirror
    });
    var j = new Pt;
    Mt = new Ft({
        recordCanvas: C,
        mutationCb: V,
        win: window,
        blockClass: o,
        blockSelector: s,
        mirror: Ht,
        sampling: y.canvas,
        dataURLOptions: b
    });
    var z = new gt({
        mutationCb: $,
        scrollCb: W,
        bypassOptions: {
            blockClass: o,
            blockSelector: s,
            maskTextClass: c,
            maskTextSelector: u,
            inlineStylesheet: d,
            maskInputOptions: D,
            dataURLOptions: b,
            maskTextFn: f,
            maskInputFn: g,
            recordCanvas: C,
            inlineImages: T,
            sampling: y,
            slimDOMOptions: B,
            iframeManager: G,
            stylesheetManager: Z,
            canvasManager: Mt,
            keepIframeSrcFn: A,
            processedNodeManager: j
        },
        mirror: Ht
    });
    Tt = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        if (S) {
            xt({
                type: Be.Meta,
                data: {
                    href: window.location.href,
                    width: ke(),
                    height: Ie()
                }
            }, e), Z.reset(), z.init(), et.forEach((e => e.lock()));
            var t = function(e, t) {
                var {
                    mirror: n = new M,
                    blockClass: r = "rr-block",
                    blockSelector: i = null,
                    maskTextClass: o = "rr-mask",
                    maskTextSelector: s = null,
                    inlineStylesheet: a = !0,
                    inlineImages: l = !1,
                    recordCanvas: c = !1,
                    maskAllInputs: u = !1,
                    maskTextFn: d,
                    maskInputFn: h,
                    slimDOM: p = !1,
                    dataURLOptions: v,
                    preserveWhiteSpace: g,
                    onSerialize: f,
                    onIframeLoad: m,
                    iframeLoadTimeout: _,
                    onStylesheetLoad: y,
                    stylesheetLoadTimeout: b,
                    keepIframeSrcFn: w = (() => !1)
                } = t || {};
                return ie(e, {
                    doc: e,
                    mirror: n,
                    blockClass: r,
                    blockSelector: i,
                    maskTextClass: o,
                    maskTextSelector: s,
                    skipChild: !1,
                    inlineStylesheet: a,
                    maskInputOptions: !0 === u ? {
                        color: !0,
                        date: !0,
                        "datetime-local": !0,
                        email: !0,
                        month: !0,
                        number: !0,
                        range: !0,
                        search: !0,
                        tel: !0,
                        text: !0,
                        time: !0,
                        url: !0,
                        week: !0,
                        textarea: !0,
                        select: !0,
                        password: !0
                    } : !1 === u ? {
                        password: !0
                    } : u,
                    maskTextFn: d,
                    maskInputFn: h,
                    slimDOMOptions: !0 === p || "all" === p ? {
                        script: !0,
                        comment: !0,
                        headFavicon: !0,
                        headWhitespace: !0,
                        headMetaDescKeywords: "all" === p,
                        headMetaSocial: !0,
                        headMetaRobots: !0,
                        headMetaHttpEquiv: !0,
                        headMetaAuthorship: !0,
                        headMetaVerification: !0
                    } : !1 === p ? {} : p,
                    dataURLOptions: v,
                    inlineImages: l,
                    recordCanvas: c,
                    preserveWhiteSpace: g,
                    onSerialize: f,
                    onIframeLoad: m,
                    iframeLoadTimeout: _,
                    onStylesheetLoad: y,
                    stylesheetLoadTimeout: b,
                    keepIframeSrcFn: w,
                    newlyAddedElement: !1
                })
            }(document, {
                mirror: Ht,
                blockClass: o,
                blockSelector: s,
                maskTextClass: c,
                maskTextSelector: u,
                inlineStylesheet: d,
                maskAllInputs: D,
                maskTextFn: f,
                maskInputFn: g,
                slimDOM: B,
                dataURLOptions: b,
                recordCanvas: C,
                inlineImages: T,
                onSerialize: e => {
                    Ae(e, Ht) && G.addIframe(e), Ne(e, Ht) && Z.trackLinkElement(e), Fe(e) && z.addShadowRoot(ge.shadowRoot(e), document)
                },
                onIframeLoad: (e, t) => {
                    G.attachIframe(e, t), z.observeAttachShadow(e)
                },
                onStylesheetLoad: (e, t) => {
                    Z.attachLinkElement(e, t)
                },
                keepIframeSrcFn: A
            });
            if (!t) return console.warn("Failed to snapshot the document");
            xt({
                type: Be.FullSnapshot,
                data: {
                    node: t,
                    initialOffset: Ce(window)
                }
            }, e), et.forEach((e => e.unlock())), document.adoptedStyleSheets && document.adoptedStyleSheets.length > 0 && Z.adoptStyleSheets(document.adoptedStyleSheets, Ht.getId(document))
        }
    };
    try {
        var Y = [],
            X = e => {
                var n;
                return Qe(ut)({
                    mutationCb: $,
                    mousemoveCb: (e, t) => xt({
                        type: Be.IncrementalSnapshot,
                        data: {
                            source: t,
                            positions: e
                        }
                    }),
                    mouseInteractionCb: e => xt({
                        type: Be.IncrementalSnapshot,
                        data: t({
                            source: qe.MouseInteraction
                        }, e)
                    }),
                    scrollCb: W,
                    viewportResizeCb: e => xt({
                        type: Be.IncrementalSnapshot,
                        data: t({
                            source: qe.ViewportResize
                        }, e)
                    }),
                    inputCb: e => xt({
                        type: Be.IncrementalSnapshot,
                        data: t({
                            source: qe.Input
                        }, e)
                    }),
                    mediaInteractionCb: e => xt({
                        type: Be.IncrementalSnapshot,
                        data: t({
                            source: qe.MediaInteraction
                        }, e)
                    }),
                    styleSheetRuleCb: e => xt({
                        type: Be.IncrementalSnapshot,
                        data: t({
                            source: qe.StyleSheetRule
                        }, e)
                    }),
                    styleDeclarationCb: e => xt({
                        type: Be.IncrementalSnapshot,
                        data: t({
                            source: qe.StyleDeclaration
                        }, e)
                    }),
                    canvasMutationCb: V,
                    fontCb: e => xt({
                        type: Be.IncrementalSnapshot,
                        data: t({
                            source: qe.Font
                        }, e)
                    }),
                    selectionCb: e => {
                        xt({
                            type: Be.IncrementalSnapshot,
                            data: t({
                                source: qe.Selection
                            }, e)
                        })
                    },
                    customElementCb: e => {
                        xt({
                            type: Be.IncrementalSnapshot,
                            data: t({
                                source: qe.CustomElement
                            }, e)
                        })
                    },
                    blockClass: o,
                    ignoreClass: a,
                    ignoreSelector: l,
                    maskTextClass: c,
                    maskTextSelector: u,
                    maskInputOptions: D,
                    inlineStylesheet: d,
                    sampling: y,
                    recordDOM: S,
                    recordCanvas: C,
                    inlineImages: T,
                    userTriggeredOnInput: E,
                    collectFonts: x,
                    doc: e,
                    maskInputFn: g,
                    maskTextFn: f,
                    keepIframeSrcFn: A,
                    blockSelector: s,
                    slimDOMOptions: B,
                    dataURLOptions: b,
                    mirror: Ht,
                    iframeManager: G,
                    stylesheetManager: Z,
                    shadowDomManager: z,
                    processedNodeManager: j,
                    canvasManager: Mt,
                    ignoreCSSAttributes: N,
                    plugins: (null == (n = null == R ? void 0 : R.filter((e => e.observer))) ? void 0 : n.map((e => ({
                        observer: e.observer,
                        options: e.options,
                        callback: t => xt({
                            type: Be.Plugin,
                            data: {
                                plugin: e.name,
                                payload: t
                            }
                        })
                    })))) || []
                }, m)
            };
        G.addLoadListener((e => {
            try {
                Y.push(X(e.contentDocument))
            } catch (e) {
                console.warn(e)
            }
        }));
        var J = () => {
            Tt(), Y.push(X(document)), Lt = !0
        };
        return "interactive" === document.readyState || "complete" === document.readyState ? J() : (Y.push(fe("DOMContentLoaded", (() => {
            xt({
                type: Be.DomContentLoaded,
                data: {}
            }), "DOMContentLoaded" === k && J()
        }))), Y.push(fe("load", (() => {
            xt({
                type: Be.Load,
                data: {}
            }), "load" === k && J()
        }), window))), () => {
            Y.forEach((e => e())), j.destroy(), Lt = !1, Ue = void 0
        }
    } catch (e) {
        console.warn(e)
    }
}
$t.addCustomEvent = (e, t) => {
    if (!Lt) throw new Error("please add custom event after start recording");
    xt({
        type: Be.Custom,
        data: {
            tag: e,
            payload: t
        }
    })
}, $t.freezePage = () => {
    et.forEach((e => e.freeze()))
}, $t.takeFullSnapshot = e => {
    if (!Lt) throw new Error("please take full snapshot after start recording");
    Tt(e)
}, $t.mirror = Ht, (qt = Bt || (Bt = {}))[qt.NotStarted = 0] = "NotStarted", qt[qt.Running = 1] = "Running", qt[qt.Stopped = 2] = "Stopped";
var Wt, Vt = Object.defineProperty,
    Zt = (e, t, n) => ((e, t, n) => t in e ? Vt(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n)(e, "symbol" != typeof t ? t + "" : t, n),
    Gt = Object.defineProperty,
    Ut = (e, t, n) => ((e, t, n) => t in e ? Gt(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n)(e, "symbol" != typeof t ? t + "" : t, n),
    jt = Object.defineProperty,
    zt = (e, t, n) => ((e, t, n) => t in e ? jt(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n)(e, "symbol" != typeof t ? t + "" : t, n),
    Yt = {
        Node: ["childNodes", "parentNode", "parentElement", "textContent"],
        ShadowRoot: ["host", "styleSheets"],
        Element: ["shadowRoot", "querySelector", "querySelectorAll"],
        MutationObserver: []
    },
    Xt = {
        Node: ["contains", "getRootNode"],
        ShadowRoot: ["getSelection"],
        Element: [],
        MutationObserver: ["constructor"]
    },
    Jt = {};

function Kt(e) {
    if (Jt[e]) return Jt[e];
    var t = globalThis[e],
        n = t.prototype,
        r = e in Yt ? Yt[e] : void 0,
        i = Boolean(r && r.every((e => {
            var t, r;
            return Boolean(null == (r = null == (t = Object.getOwnPropertyDescriptor(n, e)) ? void 0 : t.get) ? void 0 : r.toString().includes("[native code]"))
        }))),
        o = e in Xt ? Xt[e] : void 0,
        s = Boolean(o && o.every((e => {
            var t;
            return "function" == typeof n[e] && (null == (t = n[e]) ? void 0 : t.toString().includes("[native code]"))
        })));
    if (i && s) return Jt[e] = t.prototype, t.prototype;
    try {
        var a = document.createElement("iframe");
        document.body.appendChild(a);
        var l = a.contentWindow;
        if (!l) return t.prototype;
        var c = l[e].prototype;
        return document.body.removeChild(a), c ? Jt[e] = c : n
    } catch (e) {
        return n
    }
}
var Qt = {};

function en(e, t, n) {
    var r, i = "".concat(e, ".").concat(String(n));
    if (Qt[i]) return Qt[i].call(t);
    var o = Kt(e),
        s = null == (r = Object.getOwnPropertyDescriptor(o, n)) ? void 0 : r.get;
    return s ? (Qt[i] = s, s.call(t)) : t[n]
}
var tn = {};

function nn(e, t, n) {
    var r = "".concat(e, ".").concat(String(n));
    if (tn[r]) return tn[r].bind(t);
    var i = Kt(e)[n];
    return "function" != typeof i ? t[n] : (tn[r] = i, i.bind(t))
}
var rn = {
    childNodes: function(e) {
        return en("Node", e, "childNodes")
    },
    parentNode: function(e) {
        return en("Node", e, "parentNode")
    },
    parentElement: function(e) {
        return en("Node", e, "parentElement")
    },
    textContent: function(e) {
        return en("Node", e, "textContent")
    },
    contains: function(e, t) {
        return nn("Node", e, "contains")(t)
    },
    getRootNode: function(e) {
        return nn("Node", e, "getRootNode")()
    },
    host: function(e) {
        return e && "host" in e ? en("ShadowRoot", e, "host") : null
    },
    styleSheets: function(e) {
        return e.styleSheets
    },
    shadowRoot: function(e) {
        return e && "shadowRoot" in e ? en("Element", e, "shadowRoot") : null
    },
    querySelector: function(e, t) {
        return en("Element", e, "querySelector")(t)
    },
    querySelectorAll: function(e, t) {
        return en("Element", e, "querySelectorAll")(t)
    },
    mutationObserver: function() {
        return Kt("MutationObserver").constructor
    }
};
class on {
    constructor() {
        zt(this, "idNodeMap", new Map), zt(this, "nodeMetaMap", new WeakMap)
    }
    getId(e) {
        var t;
        if (!e) return -1;
        var n = null == (t = this.getMeta(e)) ? void 0 : t.id;
        return null != n ? n : -1
    }
    getNode(e) {
        return this.idNodeMap.get(e) || null
    }
    getIds() {
        return Array.from(this.idNodeMap.keys())
    }
    getMeta(e) {
        return this.nodeMetaMap.get(e) || null
    }
    removeNodeFromMap(e) {
        var t = this.getId(e);
        this.idNodeMap.delete(t), e.childNodes && e.childNodes.forEach((e => this.removeNodeFromMap(e)))
    }
    has(e) {
        return this.idNodeMap.has(e)
    }
    hasNode(e) {
        return this.nodeMetaMap.has(e)
    }
    add(e, t) {
        var n = t.id;
        this.idNodeMap.set(n, e), this.nodeMetaMap.set(e, t)
    }
    replace(e, t) {
        var n = this.getNode(e);
        if (n) {
            var r = this.nodeMetaMap.get(n);
            r && this.nodeMetaMap.set(t, r)
        }
        this.idNodeMap.set(e, t)
    }
    reset() {
        this.idNodeMap = new Map, this.nodeMetaMap = new WeakMap
    }
}

function sn(e, t, n) {
    if (!e) return !1;
    if (e.nodeType !== e.ELEMENT_NODE) return !!n && sn(rn.parentNode(e), t, n);
    for (var r = e.classList.length; r--;) {
        var i = e.classList[r];
        if (t.test(i)) return !0
    }
    return !!n && sn(rn.parentNode(e), t, n)
}
class an {
    constructor() {
        __publicField22(this, "parentElement", null), __publicField22(this, "parentNode", null), __publicField22(this, "ownerDocument"), __publicField22(this, "firstChild", null), __publicField22(this, "lastChild", null), __publicField22(this, "previousSibling", null), __publicField22(this, "nextSibling", null), __publicField22(this, "ELEMENT_NODE", 1), __publicField22(this, "TEXT_NODE", 3), __publicField22(this, "nodeType"), __publicField22(this, "nodeName"), __publicField22(this, "RRNodeType")
    }
    get childNodes() {
        for (var e = [], t = this.firstChild; t;) e.push(t), t = t.nextSibling;
        return e
    }
    contains(e) {
        if (!(e instanceof an)) return !1;
        if (e.ownerDocument !== this.ownerDocument) return !1;
        if (e === this) return !0;
        for (; e.parentNode;) {
            if (e.parentNode === this) return !0;
            e = e.parentNode
        }
        return !1
    }
    appendChild(e) {
        throw new Error("RRDomException: Failed to execute 'appendChild' on 'RRNode': This RRNode type does not support this method.")
    }
    insertBefore(e, t) {
        throw new Error("RRDomException: Failed to execute 'insertBefore' on 'RRNode': This RRNode type does not support this method.")
    }
    removeChild(e) {
        throw new Error("RRDomException: Failed to execute 'removeChild' on 'RRNode': This RRNode type does not support this method.")
    }
    toString() {
        return "RRNode"
    }
}
var ln = {
        Node: ["childNodes", "parentNode", "parentElement", "textContent"],
        ShadowRoot: ["host", "styleSheets"],
        Element: ["shadowRoot", "querySelector", "querySelectorAll"],
        MutationObserver: []
    },
    cn = {
        Node: ["contains", "getRootNode"],
        ShadowRoot: ["getSelection"],
        Element: [],
        MutationObserver: ["constructor"]
    },
    un = {};

function dn(e) {
    if (un[e]) return un[e];
    var t = globalThis[e],
        n = t.prototype,
        r = e in ln ? ln[e] : void 0,
        i = Boolean(r && r.every((e => {
            var t, r;
            return Boolean(null == (r = null == (t = Object.getOwnPropertyDescriptor(n, e)) ? void 0 : t.get) ? void 0 : r.toString().includes("[native code]"))
        }))),
        o = e in cn ? cn[e] : void 0,
        s = Boolean(o && o.every((e => {
            var t;
            return "function" == typeof n[e] && (null == (t = n[e]) ? void 0 : t.toString().includes("[native code]"))
        })));
    if (i && s) return un[e] = t.prototype, t.prototype;
    try {
        var a = document.createElement("iframe");
        document.body.appendChild(a);
        var l = a.contentWindow;
        if (!l) return t.prototype;
        var c = l[e].prototype;
        return document.body.removeChild(a), c ? un[e] = c : n
    } catch (e) {
        return n
    }
}
var hn = {};

function pn(e, t, n) {
    var r, i = "".concat(e, ".").concat(String(n));
    if (hn[i]) return hn[i].call(t);
    var o = dn(e),
        s = null == (r = Object.getOwnPropertyDescriptor(o, n)) ? void 0 : r.get;
    return s ? (hn[i] = s, s.call(t)) : t[n]
}
var vn = {};

function gn(e, t, n) {
    var r = "".concat(e, ".").concat(String(n));
    if (vn[r]) return vn[r].bind(t);
    var i = dn(e)[n];
    return "function" != typeof i ? t[n] : (vn[r] = i, i.bind(t))
}
var fn = {
    childNodes: function(e) {
        return pn("Node", e, "childNodes")
    },
    parentNode: function(e) {
        return pn("Node", e, "parentNode")
    },
    parentElement: function(e) {
        return pn("Node", e, "parentElement")
    },
    textContent: function(e) {
        return pn("Node", e, "textContent")
    },
    contains: function(e, t) {
        return gn("Node", e, "contains")(t)
    },
    getRootNode: function(e) {
        return gn("Node", e, "getRootNode")()
    },
    host: function(e) {
        return e && "host" in e ? pn("ShadowRoot", e, "host") : null
    },
    styleSheets: function(e) {
        return e.styleSheets
    },
    shadowRoot: function(e) {
        return e && "shadowRoot" in e ? pn("Element", e, "shadowRoot") : null
    },
    querySelector: function(e, t) {
        return pn("Element", e, "querySelector")(t)
    },
    querySelectorAll: function(e, t) {
        return pn("Element", e, "querySelectorAll")(t)
    },
    mutationObserver: function() {
        return dn("MutationObserver").constructor
    }
};
var mn = "Please stop import mirror directly. Instead of that,\r\nnow you can use replayer.getMirror() to access the mirror instance of a replayer,\r\nor you can use record.mirror to access the mirror instance during recording.",
    _n = {
        map: {},
        getId: () => (console.error(mn), -1),
        getNode: () => (console.error(mn), null),
        removeNodeFromMap() {
            console.error(mn)
        },
        has: () => (console.error(mn), !1),
        reset() {
            console.error(mn)
        }
    };
"undefined" != typeof window && window.Proxy && window.Reflect && (_n = new Proxy(_n, {
    get: (e, t, n) => ("map" === t && console.error(mn), Reflect.get(e, t, n))
}));
var yn = Date.now;

function bn(e) {
    return e ? e.nodeType === e.ELEMENT_NODE ? e : fn.parentElement(e) : null
}
/[1-9][0-9]{12}/.test(Date.now().toString()) || (yn = () => (new Date).getTime());

function wn(e) {
    var t, n = null;
    return "getRootNode" in e && (null == (t = fn.getRootNode(e)) ? void 0 : t.nodeType) === Node.DOCUMENT_FRAGMENT_NODE && fn.host(fn.getRootNode(e)) && (n = fn.host(fn.getRootNode(e))), n
}

function Sn(e) {
    for (var t, n = e; t = wn(n);) n = t;
    return n
}

function Cn(e) {
    var t = e.ownerDocument;
    if (!t) return !1;
    var n = Sn(e);
    return fn.contains(t, n)
}
for (var In = Object.freeze(Object.defineProperty({
        __proto__: null,
        StyleSheetMirror: class {
            constructor() {
                Ut(this, "id", 1), Ut(this, "styleIDMap", new WeakMap), Ut(this, "idStyleMap", new Map)
            }
            getId(e) {
                var t;
                return null !== (t = this.styleIDMap.get(e)) && void 0 !== t ? t : -1
            }
            has(e) {
                return this.styleIDMap.has(e)
            }
            add(e, t) {
                return this.has(e) ? this.getId(e) : (n = void 0 === t ? this.id++ : t, this.styleIDMap.set(e, n), this.idStyleMap.set(n, e), n);
                var n
            }
            getStyle(e) {
                return this.idStyleMap.get(e) || null
            }
            reset() {
                this.styleIDMap = new WeakMap, this.idStyleMap = new Map, this.id = 1
            }
            generateId() {
                return this.id++
            }
        },
        get _mirror() {
            return _n
        },
        closestElementOfNode: bn,
        getBaseDimension: function e(t, n) {
            var r, i, o = null == (i = null == (r = t.ownerDocument) ? void 0 : r.defaultView) ? void 0 : i.frameElement;
            if (!o || o === n) return {
                x: 0,
                y: 0,
                relativeScale: 1,
                absoluteScale: 1
            };
            var s = o.getBoundingClientRect(),
                a = e(o, n),
                l = s.height / o.clientHeight;
            return {
                x: s.x * a.relativeScale + a.x,
                y: s.y * a.relativeScale + a.y,
                relativeScale: l,
                absoluteScale: a.absoluteScale * l
            }
        },
        getNestedRule: function e(t, n) {
            var r = t[n[0]];
            return 1 === n.length ? r : e(r.cssRules[n[1]].cssRules, n.slice(2))
        },
        getPositionsAndIndex: function(e) {
            var t = [...e],
                n = t.pop();
            return {
                positions: t,
                index: n
            }
        },
        getRootShadowHost: Sn,
        getShadowHost: wn,
        getWindowHeight: function() {
            return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight
        },
        getWindowScroll: function(e) {
            var t, n, r, i, o = e.document;
            return {
                left: o.scrollingElement ? o.scrollingElement.scrollLeft : void 0 !== e.pageXOffset ? e.pageXOffset : o.documentElement.scrollLeft || (null == o ? void 0 : o.body) && (null == (t = fn.parentElement(o.body)) ? void 0 : t.scrollLeft) || (null == (n = null == o ? void 0 : o.body) ? void 0 : n.scrollLeft) || 0,
                top: o.scrollingElement ? o.scrollingElement.scrollTop : void 0 !== e.pageYOffset ? e.pageYOffset : (null == o ? void 0 : o.documentElement.scrollTop) || (null == o ? void 0 : o.body) && (null == (r = fn.parentElement(o.body)) ? void 0 : r.scrollTop) || (null == (i = null == o ? void 0 : o.body) ? void 0 : i.scrollTop) || 0
            }
        },
        getWindowWidth: function() {
            return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth
        },
        hasShadowRoot: function(e) {
            return !!e && (e instanceof an && "shadowRoot" in e ? Boolean(e.shadowRoot) : Boolean(fn.shadowRoot(e)))
        },
        hookSetter: function e(t, n, r, i) {
            var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : window,
                s = o.Object.getOwnPropertyDescriptor(t, n);
            return o.Object.defineProperty(t, n, i ? r : {
                set(e) {
                    setTimeout((() => {
                        r.set.call(this, e)
                    }), 0), s && s.set && s.set.call(this, e)
                }
            }), () => e(t, n, s || {}, !0)
        },
        inDom: function(e) {
            var t = e.ownerDocument;
            return !!t && (fn.contains(t, e) || Cn(e))
        },
        isAncestorRemoved: function e(t, n) {
            if (i = (r = t) && "host" in r && "mode" in r && rn.host(r) || null, Boolean(i && "shadowRoot" in i && rn.shadowRoot(i) === r)) return !1;
            var r, i, o = n.getId(t);
            if (!n.has(o)) return !0;
            var s = fn.parentNode(t);
            return (!s || s.nodeType !== t.DOCUMENT_NODE) && (!s || e(s, n))
        },
        isBlocked: function(e, t, n, r) {
            if (!e) return !1;
            var i = bn(e);
            if (!i) return !1;
            try {
                if ("string" == typeof t) {
                    if (i.classList.contains(t)) return !0;
                    if (r && null !== i.closest("." + t)) return !0
                } else if (sn(i, t, r)) return !0
            } catch (e) {}
            if (n) {
                if (i.matches(n)) return !0;
                if (r && null !== i.closest(n)) return !0
            }
            return !1
        },
        isIgnored: function(e, t, n) {
            return !("TITLE" !== e.tagName || !n.headTitleMutations) || -2 === t.getId(e)
        },
        isSerialized: function(e, t) {
            return -1 !== t.getId(e)
        },
        isSerializedIframe: function(e, t) {
            return Boolean("IFRAME" === e.nodeName && t.getMeta(e))
        },
        isSerializedStylesheet: function(e, t) {
            return Boolean("LINK" === e.nodeName && e.nodeType === e.ELEMENT_NODE && e.getAttribute && "stylesheet" === e.getAttribute("rel") && t.getMeta(e))
        },
        iterateResolveTree: function e(t, n) {
            n(t.value);
            for (var r = t.children.length - 1; r >= 0; r--) e(t.children[r], n)
        },
        legacy_isTouchEvent: function(e) {
            return Boolean(e.changedTouches)
        },
        get nowTimestamp() {
            return yn
        },
        on: function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document,
                r = {
                    capture: !0,
                    passive: !0
                };
            return n.addEventListener(e, t, r), () => n.removeEventListener(e, t, r)
        },
        patch: function(e, t, n) {
            try {
                if (!(t in e)) return () => {};
                var r = e[t],
                    i = n(r);
                return "function" == typeof i && (i.prototype = i.prototype || {}, Object.defineProperties(i, {
                    __rrweb_original__: {
                        enumerable: !1,
                        value: r
                    }
                })), e[t] = i, () => {
                    e[t] = r
                }
            } catch (e) {
                return () => {}
            }
        },
        polyfill: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
            "NodeList" in e && !e.NodeList.prototype.forEach && (e.NodeList.prototype.forEach = Array.prototype.forEach), "DOMTokenList" in e && !e.DOMTokenList.prototype.forEach && (e.DOMTokenList.prototype.forEach = Array.prototype.forEach)
        },
        queueToResolveTrees: function(e) {
            var t = {},
                n = (e, n) => {
                    var r = {
                        value: e,
                        parent: n,
                        children: []
                    };
                    return t[e.node.id] = r, r
                },
                r = [];
            for (var i of e) {
                var {
                    nextId: o,
                    parentId: s
                } = i;
                if (o && o in t) {
                    var a = t[o];
                    if (a.parent) {
                        var l = a.parent.children.indexOf(a);
                        a.parent.children.splice(l, 0, n(i, a.parent))
                    } else {
                        var c = r.indexOf(a);
                        r.splice(c, 0, n(i, null))
                    }
                } else if (s in t) {
                    var u = t[s];
                    u.children.push(n(i, u))
                } else r.push(n(i, null))
            }
            return r
        },
        shadowHostInDom: Cn,
        throttle: function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                r = null,
                i = 0;
            return function() {
                for (var o = arguments.length, s = new Array(o), a = 0; a < o; a++) s[a] = arguments[a];
                var l = Date.now();
                i || !1 !== n.leading || (i = l);
                var c = t - (l - i),
                    u = this;
                c <= 0 || c > t ? (r && (clearTimeout(r), r = null), i = l, e.apply(u, s)) : r || !1 === n.trailing || (r = setTimeout((() => {
                    i = !1 === n.leading ? 0 : Date.now(), r = null, e.apply(u, s)
                }), c))
            }
        },
        uniqueTextMutations: function(e) {
            for (var t = new Set, n = [], r = e.length; r--;) {
                var i = e[r];
                t.has(i.id) || (n.push(i), t.add(i.id))
            }
            return n
        }
    }, Symbol.toStringTag, {
        value: "Module"
    })), kn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", En = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256), xn = 0; xn < 64; xn++) En[kn.charCodeAt(xn)] = xn;
var Tn;
"undefined" != typeof window && window.Blob && new Blob([`
    (function() {
  "use strict";
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }
  var encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer), i2, len = bytes.length, base64 = "";
    for (i2 = 0; i2 < len; i2 += 3) {
      base64 += chars[bytes[i2] >> 2];
      base64 += chars[(bytes[i2] & 3) << 4 | bytes[i2 + 1] >> 4];
      base64 += chars[(bytes[i2 + 1] & 15) << 2 | bytes[i2 + 2] >> 6];
      base64 += chars[bytes[i2 + 2] & 63];
    }
    if (len % 3 === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }
    return base64;
  };
  const lastBlobMap = /* @__PURE__ */ new Map();
  const transparentBlobMap = /* @__PURE__ */ new Map();
  async function getTransparentBlobFor(width, height, dataURLOptions) {
    const id = width + '-' + height;
    if ("OffscreenCanvas" in globalThis) {
      if (transparentBlobMap.has(id)) return transparentBlobMap.get(id);
      const offscreen = new OffscreenCanvas(width, height);
      offscreen.getContext("2d");
      const blob = await offscreen.convertToBlob(dataURLOptions);
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = encode(arrayBuffer);
      transparentBlobMap.set(id, base64);
      return base64;
    } else {
      return "";
    }
  }
  const worker = self;
  worker.onmessage = async function(e) {
    if ("OffscreenCanvas" in globalThis) {
      const { id, bitmap, width, height, dataURLOptions } = e.data;
      const transparentBase64 = getTransparentBlobFor(
        width,
        height,
        dataURLOptions
      );
      const offscreen = new OffscreenCanvas(width, height);
      const ctx = offscreen.getContext("2d");
      ctx.drawImage(bitmap, 0, 0);
      bitmap.close();
      const blob = await offscreen.convertToBlob(dataURLOptions);
      const type = blob.type;
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = encode(arrayBuffer);
      if (!lastBlobMap.has(id) && await transparentBase64 === base64) {
        lastBlobMap.set(id, base64);
        return worker.postMessage({ id });
      }
      if (lastBlobMap.get(id) === base64) return worker.postMessage({ id });
      worker.postMessage({
        id,
        type,
        base64,
        width,
        height
      });
      lastBlobMap.set(id, base64);
    } else {
      return worker.postMessage({ id: e.data.id });
    }
  };
})();
//# sourceMappingURL=image-bitmap-data-url-worker-IJpC7g_b.js.map

    `], {
    type: "text/javascript;charset=utf-8"
});
try {
    if (2 !== Array.from([1], (e => 2 * e))[0]) {
        var Mn = document.createElement("iframe");
        document.body.appendChild(Mn), Array.from = (null == (Wt = Mn.contentWindow) ? void 0 : Wt.Array.from) || Array.from, document.body.removeChild(Mn)
    }
} catch (e) {
    console.debug("Unable to override Array.from", e)
}
new on,
function(e) {
    e[e.NotStarted = 0] = "NotStarted", e[e.Running = 1] = "Running", e[e.Stopped = 2] = "Stopped"
}(Tn || (Tn = {}));
class Rn {
    constructor(e) {
        Zt(this, "fileName"), Zt(this, "functionName"), Zt(this, "lineNumber"), Zt(this, "columnNumber"), this.fileName = e.fileName || "", this.functionName = e.functionName || "", this.lineNumber = e.lineNumber, this.columnNumber = e.columnNumber
    }
    toString() {
        var e = this.lineNumber || "",
            t = this.columnNumber || "";
        return this.functionName ? "".concat(this.functionName, " (").concat(this.fileName, ":").concat(e, ":").concat(t, ")") : "".concat(this.fileName, ":").concat(e, ":").concat(t)
    }
}
var An = /(^|@)\S+:\d+/,
    Nn = /^\s*at .*(\S+:\d+|\(native\))/m,
    Fn = /^(eval@)?(\[native code])?$/,
    On = {
        parse: function(e) {
            return e ? void 0 !== e.stacktrace || void 0 !== e["opera#sourceloc"] ? this.parseOpera(e) : e.stack && e.stack.match(Nn) ? this.parseV8OrIE(e) : e.stack ? this.parseFFOrSafari(e) : (console.warn("[console-record-plugin]: Failed to parse error object:", e), []) : []
        },
        extractLocation: function(e) {
            if (-1 === e.indexOf(":")) return [e];
            var t = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(e.replace(/[()]/g, ""));
            if (!t) throw new Error("Cannot parse given url: ".concat(e));
            return [t[1], t[2] || void 0, t[3] || void 0]
        },
        parseV8OrIE: function(e) {
            return e.stack.split("\n").filter((function(e) {
                return !!e.match(Nn)
            }), this).map((function(e) {
                e.indexOf("(eval ") > -1 && (e = e.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(\),.*$)/g, ""));
                var t = e.replace(/^\s+/, "").replace(/\(eval code/g, "("),
                    n = t.match(/ (\((.+):(\d+):(\d+)\)$)/),
                    r = (t = n ? t.replace(n[0], "") : t).split(/\s+/).slice(1),
                    i = this.extractLocation(n ? n[1] : r.pop()),
                    o = r.join(" ") || void 0,
                    s = ["eval", "<anonymous>"].indexOf(i[0]) > -1 ? void 0 : i[0];
                return new Rn({
                    functionName: o,
                    fileName: s,
                    lineNumber: i[1],
                    columnNumber: i[2]
                })
            }), this)
        },
        parseFFOrSafari: function(e) {
            return e.stack.split("\n").filter((function(e) {
                return !e.match(Fn)
            }), this).map((function(e) {
                if (e.indexOf(" > eval") > -1 && (e = e.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1")), -1 === e.indexOf("@") && -1 === e.indexOf(":")) return new Rn({
                    functionName: e
                });
                var t = /((.*".+"[^@]*)?[^@]*)(?:@)/,
                    n = e.match(t),
                    r = n && n[1] ? n[1] : void 0,
                    i = this.extractLocation(e.replace(t, ""));
                return new Rn({
                    functionName: r,
                    fileName: i[0],
                    lineNumber: i[1],
                    columnNumber: i[2]
                })
            }), this)
        },
        parseOpera: function(e) {
            return !e.stacktrace || e.message.indexOf("\n") > -1 && e.message.split("\n").length > e.stacktrace.split("\n").length ? this.parseOpera9(e) : e.stack ? this.parseOpera11(e) : this.parseOpera10(e)
        },
        parseOpera9: function(e) {
            for (var t = /Line (\d+).*script (?:in )?(\S+)/i, n = e.message.split("\n"), r = [], i = 2, o = n.length; i < o; i += 2) {
                var s = t.exec(n[i]);
                s && r.push(new Rn({
                    fileName: s[2],
                    lineNumber: parseFloat(s[1])
                }))
            }
            return r
        },
        parseOpera10: function(e) {
            for (var t = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, n = e.stacktrace.split("\n"), r = [], i = 0, o = n.length; i < o; i += 2) {
                var s = t.exec(n[i]);
                s && r.push(new Rn({
                    functionName: s[3] || void 0,
                    fileName: s[2],
                    lineNumber: parseFloat(s[1])
                }))
            }
            return r
        },
        parseOpera11: function(e) {
            return e.stack.split("\n").filter((function(e) {
                return !!e.match(An) && !e.match(/^Error created at/)
            }), this).map((function(e) {
                var t = e.split("@"),
                    n = this.extractLocation(t.pop()),
                    r = (t.shift() || "").replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^)]*\)/g, "") || void 0;
                return new Rn({
                    functionName: r,
                    fileName: n[0],
                    lineNumber: n[1],
                    columnNumber: n[2]
                })
            }), this)
        }
    };

function Pn(e) {
    if (!e || !e.outerHTML) return "";
    for (var t = ""; e.parentElement;) {
        var n = e.localName;
        if (!n) break;
        n = n.toLowerCase();
        var r = e.parentElement,
            i = [];
        if (r.children && r.children.length > 0)
            for (var o = 0; o < r.children.length; o++) {
                var s = r.children[o];
                s.localName && s.localName.toLowerCase && s.localName.toLowerCase() === n && i.push(s)
            }
        i.length > 1 && (n += ":eq(".concat(i.indexOf(e), ")")), t = n + (t ? ">" + t : ""), e = r
    }
    return t
}

function Ln(e) {
    return "[object Object]" === Object.prototype.toString.call(e)
}

function Dn(e, t) {
    if (0 === t) return !0;
    var n = Object.keys(e);
    for (var r of n)
        if (Ln(e[r]) && Dn(e[r], t - 1)) return !0;
    return !1
}

function Bn(e, t) {
    var n = {
        numOfKeysLimit: 50,
        depthOfLimit: 4
    };
    Object.assign(n, t);
    var r = [],
        i = [];
    return JSON.stringify(e, (function(e, t) {
        if (r.length > 0) {
            var o = r.indexOf(this);
            ~o ? r.splice(o + 1) : r.push(this), ~o ? i.splice(o, 1 / 0, e) : i.push(e), ~r.indexOf(t) && (t = r[0] === t ? "[Circular ~]" : "[Circular ~." + i.slice(0, r.indexOf(t)).join(".") + "]")
        } else r.push(t);
        if (null === t) return t;
        if (void 0 === t) return "undefined";
        if (function(e) {
                if (Ln(e) && Object.keys(e).length > n.numOfKeysLimit) return !0;
                if ("function" == typeof e) return !0;
                if (Ln(e) && Dn(e, n.depthOfLimit)) return !0;
                return !1
            }(t)) return function(e) {
            var t = e.toString();
            n.stringLengthLimit && t.length > n.stringLengthLimit && (t = "".concat(t.slice(0, n.stringLengthLimit), "..."));
            return t
        }(t);
        if ("bigint" == typeof t) return t.toString() + "n";
        if (t instanceof Event) {
            var s = {};
            for (var a in t) {
                var l = t[a];
                Array.isArray(l) ? s[a] = Pn(l.length ? l[0] : null) : s[a] = l
            }
            return s
        }
        return t instanceof Node ? t instanceof HTMLElement ? t ? t.outerHTML : "" : t.nodeName : t instanceof Error ? t.stack ? t.stack + "\nEnd of stack for Error object" : t.name + ": " + t.message : t
    }))
}
var qn = {
    level: ["assert", "clear", "count", "countReset", "debug", "dir", "dirxml", "error", "group", "groupCollapsed", "groupEnd", "info", "log", "table", "time", "timeEnd", "timeLog", "trace", "warn"],
    lengthThreshold: 1e3,
    logger: "console"
};

function Hn(e, t, n) {
    var r, i = n ? Object.assign({}, qn, n) : qn,
        o = i.logger;
    if (!o) return () => {};
    r = "string" == typeof o ? t[o] : o;
    var s = 0,
        a = !1,
        l = [];
    if (i.level.includes("error")) {
        var c = t => {
            var n = t.message,
                r = t.error,
                o = On.parse(r).map((e => e.toString())),
                s = [Bn(n, i.stringifyOptions)];
            e({
                level: "error",
                trace: o,
                payload: s
            })
        };
        t.addEventListener("error", c), l.push((() => {
            t.removeEventListener("error", c)
        }));
        var u = t => {
            var n, r;
            t.reason instanceof Error ? (n = t.reason, r = [Bn("Uncaught (in promise) ".concat(n.name, ": ").concat(n.message), i.stringifyOptions)]) : (n = new Error, r = [Bn("Uncaught (in promise)", i.stringifyOptions), Bn(t.reason, i.stringifyOptions)]);
            var o = On.parse(n).map((e => e.toString()));
            e({
                level: "error",
                trace: o,
                payload: r
            })
        };
        t.addEventListener("unhandledrejection", u), l.push((() => {
            t.removeEventListener("unhandledrejection", u)
        }))
    }
    for (var d of i.level) l.push(h(r, d));
    return () => {
        l.forEach((e => e()))
    };

    function h(t, n) {
        var r = this;
        return t[n] ? In.patch(t, n, (t => function() {
            for (var o = arguments.length, l = new Array(o), c = 0; c < o; c++) l[c] = arguments[c];
            if (t.apply(r, l), !("assert" === n && l[0] || a)) {
                a = !0;
                try {
                    var u = On.parse(new Error).map((e => e.toString())).splice(1),
                        d = ("assert" === n ? l.slice(1) : l).map((e => Bn(e, i.stringifyOptions)));
                    ++s < i.lengthThreshold ? e({
                        level: n,
                        trace: u,
                        payload: d
                    }) : s === i.lengthThreshold && e({
                        level: "warn",
                        trace: [],
                        payload: [Bn("The number of log records reached the threshold.")]
                    })
                } catch (e) {
                    t("rrweb logger error:", e, ...l)
                } finally {
                    a = !1
                }
            }
        })) : () => {}
    }
}
var $n, Wn = e => ({
        name: "rrweb/console@1",
        observer: Hn,
        options: e
    }),
    Vn = "undefined" != typeof window ? window : void 0,
    Zn = "undefined" != typeof globalThis ? globalThis : Vn,
    Gn = Array.prototype,
    Un = Gn.forEach,
    jn = Gn.indexOf,
    zn = null == Zn ? void 0 : Zn.navigator,
    Yn = null == Zn ? void 0 : Zn.document,
    Xn = null == Zn ? void 0 : Zn.location,
    Jn = null == Zn ? void 0 : Zn.fetch,
    Kn = null != Zn && Zn.XMLHttpRequest && "withCredentials" in new Zn.XMLHttpRequest ? Zn.XMLHttpRequest : void 0,
    Qn = null == Zn ? void 0 : Zn.AbortController,
    er = null == zn ? void 0 : zn.userAgent,
    tr = null != Vn ? Vn : {},
    nr = "$copy_autocapture",
    rr = ["$snapshot", "$pageview", "$pageleave", "$set", "survey dismissed", "survey sent", "survey shown", "$identify", "$groupidentify", "$create_alias", "$$client_ingestion_warning", "$web_experiment_applied", "$feature_enrollment_update", "$feature_flag_called"];
! function(e) {
    e.GZipJS = "gzip-js", e.Base64 = "base64"
}($n || ($n = {}));
var ir = ["fatal", "error", "warning", "log", "info", "debug"];

function or(e, t) {
    return -1 !== e.indexOf(t)
}
var sr = function(e) {
        return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    },
    ar = function(e) {
        return e.replace(/^\$/, "")
    };
var lr = Array.isArray,
    cr = Object.prototype,
    ur = cr.hasOwnProperty,
    dr = cr.toString,
    hr = lr || function(e) {
        return "[object Array]" === dr.call(e)
    },
    pr = e => "function" == typeof e,
    vr = e => pr(e) && -1 !== e.toString().indexOf("[native code]"),
    gr = () => !!Vn.Zone,
    fr = e => e === Object(e) && !hr(e),
    mr = e => {
        if (fr(e)) {
            for (var t in e)
                if (ur.call(e, t)) return !1;
            return !0
        }
        return !1
    },
    _r = e => void 0 === e,
    yr = e => "[object String]" == dr.call(e),
    br = e => yr(e) && 0 === e.trim().length,
    wr = e => null === e,
    Sr = e => _r(e) || wr(e),
    Cr = e => "[object Number]" == dr.call(e),
    Ir = e => "[object Boolean]" === dr.call(e),
    kr = e => e instanceof Document,
    Er = e => e instanceof FormData,
    xr = e => or(rr, e),
    Tr = {
        DEBUG: !1,
        LIB_VERSION: "1.207.0"
    },
    Mr = e => {
        var t = {
            _log: function(t) {
                if (Vn && (Tr.DEBUG || tr.POSTHOG_DEBUG) && !_r(Vn.console) && Vn.console) {
                    for (var n = ("__rrweb_original__" in Vn.console[t] ? Vn.console[t].__rrweb_original__ : Vn.console[t]), r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) i[o - 1] = arguments[o];
                    n(e, ...i)
                }
            },
            info: function() {
                for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                t._log("log", ...n)
            },
            warn: function() {
                for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                t._log("warn", ...n)
            },
            error: function() {
                for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                t._log("error", ...n)
            },
            critical: function() {
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                console.error(e, ...n)
            },
            uninitializedWarning: e => {
                t.error("You must initialize PostHog before calling ".concat(e))
            },
            createLogger: t => Mr("".concat(e, " ").concat(t))
        };
        return t
    },
    Rr = Mr("[PostHog.js]"),
    Ar = Rr.createLogger,
    Nr = {};

function Fr(e, t, n) {
    if (hr(e))
        if (Un && e.forEach === Un) e.forEach(t, n);
        else if ("length" in e && e.length === +e.length)
        for (var r = 0, i = e.length; r < i; r++)
            if (r in e && t.call(n, e[r], r) === Nr) return
}

function Or(e, t, n) {
    if (!Sr(e)) {
        if (hr(e)) return Fr(e, t, n);
        if (Er(e)) {
            for (var r of e.entries())
                if (t.call(n, r[1], r[0]) === Nr) return
        } else
            for (var i in e)
                if (ur.call(e, i) && t.call(n, e[i], i) === Nr) return
    }
}
var Pr = function(e) {
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
        return Fr(n, (function(t) {
            for (var n in t) void 0 !== t[n] && (e[n] = t[n])
        })), e
    },
    Lr = function(e) {
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
        return Fr(n, (function(t) {
            Fr(t, (function(t) {
                e.push(t)
            }))
        })), e
    };

function Dr(e) {
    for (var t = Object.keys(e), n = t.length, r = new Array(n); n--;) r[n] = [t[n], e[t[n]]];
    return r
}
var Br = function(e) {
        try {
            return e()
        } catch (e) {
            return
        }
    },
    qr = function(e) {
        return function() {
            try {
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                return e.apply(this, n)
            } catch (e) {
                Rr.critical("Implementation error. Please turn on debug mode and open a ticket on https://app.posthog.com/home#panel=support%3Asupport%3A."), Rr.critical(e)
            }
        }
    },
    Hr = function(e) {
        var t = {};
        return Or(e, (function(e, n) {
            yr(e) && e.length > 0 && (t[n] = e)
        })), t
    };

function $r(e, t) {
    return n = e, r = e => yr(e) && !wr(t) ? e.slice(0, t) : e, i = new Set,
        function e(t, n) {
            return t !== Object(t) ? r ? r(t, n) : t : i.has(t) ? void 0 : (i.add(t), hr(t) ? (o = [], Fr(t, (t => {
                o.push(e(t))
            }))) : (o = {}, Or(t, ((t, n) => {
                i.has(t) || (o[n] = e(t, n))
            }))), o);
            var o
        }(n);
    var n, r, i
}
var Wr = function() {
    function e(t) {
        return t && (t.preventDefault = e.preventDefault, t.stopPropagation = e.stopPropagation), t
    }
    return e.preventDefault = function() {
            this.returnValue = !1
        }, e.stopPropagation = function() {
            this.cancelBubble = !0
        },
        function(t, n, r, i, o) {
            if (t)
                if (t.addEventListener && !i) t.addEventListener(n, r, !!o);
                else {
                    var s = "on" + n,
                        a = t[s];
                    t[s] = function(t, n, r) {
                        return function(i) {
                            if (i = i || e(null == Vn ? void 0 : Vn.event)) {
                                var o, s = !0;
                                pr(r) && (o = r(i));
                                var a = n.call(t, i);
                                return !1 !== o && !1 !== a || (s = !1), s
                            }
                        }
                    }(t, r, a)
                }
            else Rr.error("No valid element provided to register_event")
        }
}();

function Vr(e, t) {
    for (var n = 0; n < e.length; n++)
        if (t(e[n])) return e[n]
}
var Zr = ["localhost", "127.0.0.1"],
    Gr = e => {
        var t = null == Yn ? void 0 : Yn.createElement("a");
        return _r(t) ? null : (t.href = e, t)
    },
    Ur = function(e, t) {
        return !! function(e) {
            try {
                new RegExp(e)
            } catch (e) {
                return !1
            }
            return !0
        }(t) && new RegExp(t).test(e)
    },
    jr = function(e) {
        var t, n, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "&",
            i = [];
        return Or(e, (function(e, r) {
            _r(e) || _r(r) || "undefined" === r || (t = encodeURIComponent((e => e instanceof File)(e) ? e.name : e.toString()), n = encodeURIComponent(r), i[i.length] = n + "=" + t)
        })), i.join(r)
    },
    zr = function(e, t) {
        for (var n, r = ((e.split("#")[0] || "").split("?")[1] || "").split("&"), i = 0; i < r.length; i++) {
            var o = r[i].split("=");
            if (o[0] === t) {
                n = o;
                break
            }
        }
        if (!hr(n) || n.length < 2) return "";
        var s = n[1];
        try {
            s = decodeURIComponent(s)
        } catch (e) {
            Rr.error("Skipping decoding for malformed query param: " + s)
        }
        return s.replace(/\+/g, " ")
    },
    Yr = function(e, t, n) {
        if (!e || !t || !t.length) return e;
        for (var r = e.split("#"), i = r[0] || "", o = r[1], s = i.split("?"), a = s[1], l = s[0], c = (a || "").split("&"), u = [], d = 0; d < c.length; d++) {
            var h = c[d].split("=");
            hr(h) && (t.includes(h[0]) ? u.push(h[0] + "=" + n) : u.push(c[d]))
        }
        var p = l;
        return null != a && (p += "?" + u.join("&")), null != o && (p += "#" + o), p
    },
    Xr = function(e, t) {
        var n = e.match(new RegExp(t + "=([^&]*)"));
        return n ? n[1] : null
    },
    Jr = "$people_distinct_id",
    Kr = "__alias",
    Qr = "__timers",
    ei = "$autocapture_disabled_server_side",
    ti = "$heatmaps_enabled_server_side",
    ni = "$exception_capture_enabled_server_side",
    ri = "$web_vitals_enabled_server_side",
    ii = "$dead_clicks_enabled_server_side",
    oi = "$web_vitals_allowed_metrics",
    si = "$session_recording_enabled_server_side",
    ai = "$console_log_recording_enabled_server_side",
    li = "$session_recording_network_payload_capture",
    ci = "$session_recording_canvas_recording",
    ui = "$replay_sample_rate",
    di = "$replay_minimum_duration",
    hi = "$replay_script_config",
    pi = "$sesid",
    vi = "$session_is_sampled",
    gi = "$session_recording_url_trigger_activated_session",
    fi = "$session_recording_event_trigger_activated_session",
    mi = "$enabled_feature_flags",
    _i = "$early_access_features",
    yi = "$stored_person_properties",
    bi = "$stored_group_properties",
    wi = "$surveys",
    Si = "$surveys_activated",
    Ci = "$flag_call_reported",
    Ii = "$user_state",
    ki = "$client_session_props",
    Ei = "$capture_rate_limit",
    xi = "$initial_campaign_params",
    Ti = "$initial_referrer_info",
    Mi = "$initial_person_info",
    Ri = "$epp",
    Ai = "__POSTHOG_TOOLBAR__",
    Ni = "$posthog_cookieless",
    Fi = [Jr, Kr, "__cmpns", Qr, si, ti, pi, mi, Ii, _i, bi, yi, wi, Ci, ki, Ei, xi, Ti, Ri];

function Oi(e) {
    var t;
    return e instanceof Element && (e.id === Ai || !(null === (t = e.closest) || void 0 === t || !t.call(e, ".toolbar-global-fade-container")))
}

function Pi(e) {
    return !!e && 1 === e.nodeType
}

function Li(e, t) {
    return !!e && !!e.tagName && e.tagName.toLowerCase() === t.toLowerCase()
}

function Di(e) {
    return !!e && 3 === e.nodeType
}

function Bi(e) {
    return !!e && 11 === e.nodeType
}

function qi(e) {
    return e ? sr(e).split(/\s+/) : []
}

function Hi(e) {
    var t = null == Vn ? void 0 : Vn.location.href;
    return !!(t && e && e.some((e => t.match(e))))
}

function $i(e) {
    var t = "";
    switch (typeof e.className) {
        case "string":
            t = e.className;
            break;
        case "object":
            t = (e.className && "baseVal" in e.className ? e.className.baseVal : null) || e.getAttribute("class") || "";
            break;
        default:
            t = ""
    }
    return qi(t)
}

function Wi(e) {
    return Sr(e) ? null : sr(e).split(/(\s+)/).filter((e => no(e))).join("").replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255)
}

function Vi(e) {
    var t = "";
    return zi(e) && !Yi(e) && e.childNodes && e.childNodes.length && Or(e.childNodes, (function(e) {
        var n;
        Di(e) && e.textContent && (t += null !== (n = Wi(e.textContent)) && void 0 !== n ? n : "")
    })), sr(t)
}

function Zi(e) {
    return _r(e.target) ? e.srcElement || null : null !== (t = e.target) && void 0 !== t && t.shadowRoot ? e.composedPath()[0] || null : e.target || null;
    var t
}
var Gi = ["a", "button", "form", "input", "select", "textarea", "label"];

function Ui(e) {
    var t = e.parentNode;
    return !(!t || !Pi(t)) && t
}

function ji(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0,
        r = arguments.length > 3 ? arguments[3] : void 0,
        i = arguments.length > 4 ? arguments[4] : void 0;
    if (!Vn || !e || Li(e, "html") || !Pi(e)) return !1;
    if (null != n && n.url_allowlist && !Hi(n.url_allowlist)) return !1;
    if (null != n && n.url_ignorelist && Hi(n.url_ignorelist)) return !1;
    if (null != n && n.dom_event_allowlist) {
        var o = n.dom_event_allowlist;
        if (o && !o.some((e => t.type === e))) return !1
    }
    for (var s = !1, a = [e], l = !0, c = e; c.parentNode && !Li(c, "body");)
        if (Bi(c.parentNode)) a.push(c.parentNode.host), c = c.parentNode.host;
        else {
            if (!(l = Ui(c))) break;
            if (r || Gi.indexOf(l.tagName.toLowerCase()) > -1) s = !0;
            else {
                var u = Vn.getComputedStyle(l);
                u && "pointer" === u.getPropertyValue("cursor") && (s = !0)
            }
            a.push(l), c = l
        } if (! function(e, t) {
            var n = null == t ? void 0 : t.element_allowlist;
            if (_r(n)) return !0;
            var r = function(e) {
                if (n.some((t => e.tagName.toLowerCase() === t))) return {
                    v: !0
                }
            };
            for (var i of e) {
                var o = r(i);
                if ("object" == typeof o) return o.v
            }
            return !1
        }(a, n)) return !1;
    if (! function(e, t) {
            var n = null == t ? void 0 : t.css_selector_allowlist;
            if (_r(n)) return !0;
            var r = function(e) {
                if (n.some((t => e.matches(t)))) return {
                    v: !0
                }
            };
            for (var i of e) {
                var o = r(i);
                if ("object" == typeof o) return o.v
            }
            return !1
        }(a, n)) return !1;
    var d = Vn.getComputedStyle(e);
    if (d && "pointer" === d.getPropertyValue("cursor") && "click" === t.type) return !0;
    var h = e.tagName.toLowerCase();
    switch (h) {
        case "html":
            return !1;
        case "form":
            return (i || ["submit"]).indexOf(t.type) >= 0;
        case "input":
        case "select":
        case "textarea":
            return (i || ["change", "click"]).indexOf(t.type) >= 0;
        default:
            return s ? (i || ["click"]).indexOf(t.type) >= 0 : (i || ["click"]).indexOf(t.type) >= 0 && (Gi.indexOf(h) > -1 || "true" === e.getAttribute("contenteditable"))
    }
}

function zi(e) {
    for (var t = e; t.parentNode && !Li(t, "body"); t = t.parentNode) {
        var n = $i(t);
        if (or(n, "ph-sensitive") || or(n, "ph-no-capture")) return !1
    }
    if (or($i(e), "ph-include")) return !0;
    var r = e.type || "";
    if (yr(r)) switch (r.toLowerCase()) {
        case "hidden":
        case "password":
            return !1
    }
    var i = e.name || e.id || "";
    if (yr(i)) {
        if (/^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i.test(i.replace(/[^a-zA-Z0-9]/g, ""))) return !1
    }
    return !0
}

function Yi(e) {
    return !!(Li(e, "input") && !["button", "checkbox", "submit", "reset"].includes(e.type) || Li(e, "select") || Li(e, "textarea") || "true" === e.getAttribute("contenteditable"))
}
var Xi = "(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11})",
    Ji = new RegExp("^(?:".concat(Xi, ")$")),
    Ki = new RegExp(Xi),
    Qi = "\\d{3}-?\\d{2}-?\\d{4}",
    eo = new RegExp("^(".concat(Qi, ")$")),
    to = new RegExp("(".concat(Qi, ")"));

function no(e) {
    var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
    if (Sr(e)) return !1;
    if (yr(e)) {
        if (e = sr(e), (t ? Ji : Ki).test((e || "").replace(/[- ]/g, ""))) return !1;
        if ((t ? eo : to).test(e)) return !1
    }
    return !0
}

function ro(e) {
    var t = Vi(e);
    return no(t = "".concat(t, " ").concat(io(e)).trim()) ? t : ""
}

function io(e) {
    var t = "";
    return e && e.childNodes && e.childNodes.length && Or(e.childNodes, (function(e) {
        var n;
        if (e && "span" === (null === (n = e.tagName) || void 0 === n ? void 0 : n.toLowerCase())) try {
            var r = Vi(e);
            t = "".concat(t, " ").concat(r).trim(), e.childNodes && e.childNodes.length && (t = "".concat(t, " ").concat(io(e)).trim())
        } catch (e) {
            Rr.error("[AutoCapture]", e)
        }
    })), t
}

function oo(e) {
    return function(e) {
        var n = e.map((e => {
            var n, r, i = "";
            if (e.tag_name && (i += e.tag_name), e.attr_class)
                for (var o of (e.attr_class.sort(), e.attr_class)) i += ".".concat(o.replace(/"/g, ""));
            var s = t(t(t(t({}, e.text ? {
                    text: e.text
                } : {}), {}, {
                    "nth-child": null !== (n = e.nth_child) && void 0 !== n ? n : 0,
                    "nth-of-type": null !== (r = e.nth_of_type) && void 0 !== r ? r : 0
                }, e.href ? {
                    href: e.href
                } : {}), e.attr_id ? {
                    attr_id: e.attr_id
                } : {}), e.attributes),
                a = {};
            return Dr(s).sort(((e, t) => {
                var [n] = e, [r] = t;
                return n.localeCompare(r)
            })).forEach((e => {
                var [t, n] = e;
                return a[so(t.toString())] = so(n.toString())
            })), i += ":", i += Dr(s).map((e => {
                var [t, n] = e;
                return "".concat(t, '="').concat(n, '"')
            })).join("")
        }));
        return n.join(";")
    }(function(e) {
        return e.map((e => {
            var t, n, r = {
                text: null === (t = e.$el_text) || void 0 === t ? void 0 : t.slice(0, 400),
                tag_name: e.tag_name,
                href: null === (n = e.attr__href) || void 0 === n ? void 0 : n.slice(0, 2048),
                attr_class: ao(e),
                attr_id: e.attr__id,
                nth_child: e.nth_child,
                nth_of_type: e.nth_of_type,
                attributes: {}
            };
            return Dr(e).filter((e => {
                var [t] = e;
                return 0 === t.indexOf("attr__")
            })).forEach((e => {
                var [t, n] = e;
                return r.attributes[t] = n
            })), r
        }))
    }(e))
}

function so(e) {
    return e.replace(/"|\\"/g, '\\"')
}

function ao(e) {
    var t = e.attr__class;
    return t ? hr(t) ? t : qi(t) : void 0
}
var lo = "[SessionRecording]",
    co = "redacted",
    uo = {
        initiatorTypes: ["audio", "beacon", "body", "css", "early-hint", "embed", "fetch", "frame", "iframe", "icon", "image", "img", "input", "link", "navigation", "object", "ping", "script", "track", "video", "xmlhttprequest"],
        maskRequestFn: e => e,
        recordHeaders: !1,
        recordBody: !1,
        recordInitialRequests: !1,
        recordPerformance: !1,
        performanceEntryTypeToObserve: ["first-input", "navigation", "paint", "resource"],
        payloadSizeLimitBytes: 1e6,
        payloadHostDenyList: [".lr-ingest.io", ".ingest.sentry.io", ".clarity.ms", "analytics.google.com"]
    },
    ho = ["authorization", "x-forwarded-for", "authorization", "cookie", "set-cookie", "x-api-key", "x-real-ip", "remote-addr", "forwarded", "proxy-authorization", "x-csrf-token", "x-csrftoken", "x-xsrf-token"],
    po = ["password", "secret", "passwd", "api_key", "apikey", "auth", "credentials", "mysql_pwd", "privatekey", "private_key", "token"],
    vo = ["/s/", "/e/", "/i/"];

function go(e, t, n, r) {
    if (Sr(e)) return e;
    var i = (null == t ? void 0 : t["content-length"]) || function(e) {
        return new Blob([e]).size
    }(e);
    return yr(i) && (i = parseInt(i)), i > n ? lo + " ".concat(r, " body too large to record (").concat(i, " bytes)") : e
}

function fo(e, t) {
    if (Sr(e)) return e;
    var n = e;
    return no(n, !1) || (n = lo + " " + t + " body " + co), Or(po, (e => {
        var r, i;
        null !== (r = n) && void 0 !== r && r.length && -1 !== (null === (i = n) || void 0 === i ? void 0 : i.indexOf(e)) && (n = lo + " " + t + " body " + co + " as might contain: " + e)
    })), n
}
var mo = (e, n) => {
    var r, i, o, s = {
            payloadSizeLimitBytes: uo.payloadSizeLimitBytes,
            performanceEntryTypeToObserve: [...uo.performanceEntryTypeToObserve],
            payloadHostDenyList: [...n.payloadHostDenyList || [], ...uo.payloadHostDenyList]
        },
        a = !1 !== e.session_recording.recordHeaders && n.recordHeaders,
        l = !1 !== e.session_recording.recordBody && n.recordBody,
        c = !1 !== e.capture_performance && n.recordPerformance,
        u = (r = s, o = Math.min(1e6, null !== (i = r.payloadSizeLimitBytes) && void 0 !== i ? i : 1e6), e => (null != e && e.requestBody && (e.requestBody = go(e.requestBody, e.requestHeaders, o, "Request")), null != e && e.responseBody && (e.responseBody = go(e.responseBody, e.responseHeaders, o, "Response")), e)),
        d = t => {
            return u(((e, t) => {
                var n, r = Gr(e.name),
                    i = 0 === t.indexOf("http") ? null === (n = Gr(t)) || void 0 === n ? void 0 : n.pathname : t;
                "/" === i && (i = "");
                var o = null == r ? void 0 : r.pathname.replace(i || "", "");
                if (!(r && o && vo.some((e => 0 === o.indexOf(e))))) return e
            })((r = (n = t).requestHeaders, Sr(r) || Or(Object.keys(null != r ? r : {}), (e => {
                ho.includes(e.toLowerCase()) && (r[e] = co)
            })), n), e.api_host));
            var n, r
        },
        h = pr(e.session_recording.maskNetworkRequestFn);
    return h && pr(e.session_recording.maskCapturedNetworkRequestFn) && Rr.warn("Both `maskNetworkRequestFn` and `maskCapturedNetworkRequestFn` are defined. `maskNetworkRequestFn` will be ignored."), h && (e.session_recording.maskCapturedNetworkRequestFn = n => {
        var r = e.session_recording.maskNetworkRequestFn({
            url: n.name
        });
        return t(t({}, n), {}, {
            name: null == r ? void 0 : r.url
        })
    }), s.maskRequestFn = pr(e.session_recording.maskCapturedNetworkRequestFn) ? t => {
        var n, r, i, o = d(t);
        return o && null !== (n = null === (r = (i = e.session_recording).maskCapturedNetworkRequestFn) || void 0 === r ? void 0 : r.call(i, o)) && void 0 !== n ? n : void 0
    } : e => function(e) {
        if (!_r(e)) return e.requestBody = fo(e.requestBody, "Request"), e.responseBody = fo(e.responseBody, "Response"), e
    }(d(e)), t(t(t({}, uo), s), {}, {
        recordHeaders: a,
        recordBody: l,
        recordPerformance: c,
        recordInitialRequests: c
    })
};

function _o(e, t, n) {
    try {
        if (!(t in e)) return () => {};
        var r = e[t],
            i = n(r);
        return pr(i) && (i.prototype = i.prototype || {}, Object.defineProperties(i, {
            __posthog_wrapped__: {
                enumerable: !1,
                value: !0
            }
        })), e[t] = i, () => {
            e[t] = r
        }
    } catch (e) {
        return () => {}
    }
}

function yo(e, t) {
    var n, r = function(e) {
            try {
                return "string" == typeof e ? new URL(e).hostname : "url" in e ? new URL(e.url).hostname : e.hostname
            } catch (e) {
                return null
            }
        }(e),
        i = {
            hostname: r,
            isHostDenied: !1
        };
    if (null === (n = t.payloadHostDenyList) || void 0 === n || !n.length || null == r || !r.trim().length) return i;
    for (var o of t.payloadHostDenyList)
        if (r.endsWith(o)) return {
            hostname: r,
            isHostDenied: !0
        };
    return i
}
var bo = Ar("[Recorder]"),
    wo = e => "navigation" === e.entryType,
    So = e => "resource" === e.entryType;

function Co(e, t, n) {
    if (n.recordInitialRequests) {
        var r = t.performance.getEntries().filter((e => wo(e) || So(e) && n.initiatorTypes.includes(e.initiatorType)));
        e({
            requests: r.flatMap((e => Ro({
                entry: e,
                method: void 0,
                status: void 0,
                networkRequest: {},
                isInitial: !0
            }))),
            isInitial: !0
        })
    }
    var i = new t.PerformanceObserver((t => {
            var r = t.getEntries().filter((e => wo(e) || So(e) && n.initiatorTypes.includes(e.initiatorType) && (e => !n.recordBody && !n.recordHeaders || "xmlhttprequest" !== e.initiatorType && "fetch" !== e.initiatorType)(e)));
            e({
                requests: r.flatMap((e => Ro({
                    entry: e,
                    method: void 0,
                    status: void 0,
                    networkRequest: {}
                })))
            })
        })),
        o = PerformanceObserver.supportedEntryTypes.filter((e => n.performanceEntryTypeToObserve.includes(e)));
    return i.observe({
        entryTypes: o
    }), () => {
        i.disconnect()
    }
}

function Io(e, t) {
    return !!t && (Ir(t) || t[e])
}

function ko(e) {
    var {
        type: t,
        recordBody: n,
        headers: r
    } = e;

    function i(e) {
        var t = Object.keys(r).find((e => "content-type" === e.toLowerCase())),
            n = t && r[t];
        return e.some((e => null == n ? void 0 : n.includes(e)))
    }
    if (!n) return !1;
    if (Ir(n)) return !0;
    if (hr(n)) return i(n);
    var o = n[t];
    return Ir(o) ? o : i(o)
}

function Eo(e, t, n, r, i) {
    return xo.apply(this, arguments)
}

function xo() {
    return xo = r((function*(e, t, n, r, i) {
        var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
        if (o > 10) return bo.warn("Failed to get performance entry for request", {
            url: n,
            initiatorType: t
        }), null;
        var s = function(e, t) {
            for (var n = e.length - 1; n >= 0; n -= 1)
                if (t(e[n])) return e[n]
        }(e.performance.getEntriesByName(n), (e => So(e) && e.initiatorType === t && (_r(r) || e.startTime >= r) && (_r(i) || e.startTime <= i)));
        return s || (yield new Promise((e => setTimeout(e, 50 * o))), Eo(e, t, n, r, i, o + 1))
    })), xo.apply(this, arguments)
}

function To(e) {
    var {
        body: t,
        options: n,
        url: r
    } = e;
    if (Sr(t)) return null;
    var {
        hostname: i,
        isHostDenied: o
    } = yo(r, n);
    if (o) return i + " is in deny list";
    if (yr(t)) return t;
    if (kr(t)) return t.textContent;
    if (Er(t)) return jr(t);
    if (fr(t)) try {
        return JSON.stringify(t)
    } catch (e) {
        return "[SessionReplay] Failed to stringify response object"
    }
    return "[SessionReplay] Cannot read body of type " + toString.call(t)
}
var Mo = e => !wr(e) && ("navigation" === e.entryType || "resource" === e.entryType);

function Ro(e) {
    var {
        entry: n,
        method: r,
        status: i,
        networkRequest: o,
        isInitial: s,
        start: a,
        end: l,
        url: c,
        initiatorType: u
    } = e;
    a = n ? n.startTime : a, l = n ? n.responseEnd : l;
    var d = Math.floor(Date.now() - performance.now()),
        h = Math.floor(d + (a || 0)),
        p = [t(t({}, n ? n.toJSON() : {
            name: c
        }), {}, {
            startTime: _r(a) ? void 0 : Math.round(a),
            endTime: _r(l) ? void 0 : Math.round(l),
            timeOrigin: d,
            timestamp: h,
            method: r,
            initiatorType: u || (n ? n.initiatorType : void 0),
            status: i,
            requestHeaders: o.requestHeaders,
            requestBody: o.requestBody,
            responseHeaders: o.responseHeaders,
            responseBody: o.responseBody,
            isInitial: s
        })];
    if (Mo(n))
        for (var v of n.serverTiming || []) p.push({
            timeOrigin: d,
            timestamp: h,
            startTime: Math.round(n.startTime),
            name: v.name,
            duration: v.duration,
            entryType: "serverTiming"
        });
    return p
}
var Ao = ["video/", "audio/"];

function No(e) {
    return new Promise(((t, n) => {
        var r = setTimeout((() => t("[SessionReplay] Timeout while trying to read body")), 500);
        try {
            e.clone().text().then((e => t(e)), (e => n(e))).finally((() => clearTimeout(r)))
        } catch (e) {
            clearTimeout(r), t("[SessionReplay] Failed to read body")
        }
    }))
}

function Fo() {
    return Fo = r((function*(e) {
        var {
            r: t,
            options: n,
            url: r
        } = e, {
            hostname: i,
            isHostDenied: o
        } = yo(r, n);
        return o ? Promise.resolve(i + " is in deny list") : No(t)
    })), Fo.apply(this, arguments)
}

function Oo() {
    return Oo = r((function*(e) {
        var {
            r: t,
            options: n,
            url: r
        } = e, i = function(e) {
            var t, {
                r: n,
                options: r,
                url: i
            } = e;
            if ("chunked" === n.headers.get("Transfer-Encoding")) return "Chunked Transfer-Encoding is not supported";
            var o = null === (t = n.headers.get("Content-Type")) || void 0 === t ? void 0 : t.toLowerCase(),
                s = Ao.some((e => null == o ? void 0 : o.startsWith(e)));
            if (o && s) return "Content-Type ".concat(o, " is not supported");
            var {
                hostname: a,
                isHostDenied: l
            } = yo(i, r);
            return l ? a + " is in deny list" : null
        }({
            r: t,
            options: n,
            url: r
        });
        return wr(i) ? No(t) : Promise.resolve(i)
    })), Oo.apply(this, arguments)
}

function Po(e, t, n) {
    if (!n.initiatorTypes.includes("fetch")) return () => {};
    var i = Io("request", n.recordHeaders),
        o = Io("response", n.recordHeaders),
        s = _o(t, "fetch", (s => function() {
            var a = r((function*(r, a) {
                var l, c, u, d = new Request(r, a),
                    h = {};
                try {
                    var p = {};
                    d.headers.forEach(((e, t) => {
                        p[t] = e
                    })), i && (h.requestHeaders = p), ko({
                        type: "request",
                        headers: p,
                        url: r,
                        recordBody: n.recordBody
                    }) && (h.requestBody = yield function(e) {
                        return Fo.apply(this, arguments)
                    }({
                        r: d,
                        options: n,
                        url: r
                    })), c = t.performance.now(), l = yield s(d), u = t.performance.now();
                    var v = {};
                    return l.headers.forEach(((e, t) => {
                        v[t] = e
                    })), o && (h.responseHeaders = v), ko({
                        type: "response",
                        headers: v,
                        url: r,
                        recordBody: n.recordBody
                    }) && (h.responseBody = yield function(e) {
                        return Oo.apply(this, arguments)
                    }({
                        r: l,
                        options: n,
                        url: r
                    })), l
                } finally {
                    Eo(t, "fetch", d.url, c, u).then((t => {
                        var n, r = Ro({
                            entry: t,
                            method: d.method,
                            status: null === (n = l) || void 0 === n ? void 0 : n.status,
                            networkRequest: h,
                            start: c,
                            end: u,
                            url: d.url,
                            initiatorType: "fetch"
                        });
                        e({
                            requests: r
                        })
                    })).catch((() => {}))
                }
            }));
            return function(e, t) {
                return a.apply(this, arguments)
            }
        }()));
    return () => {
        s()
    }
}
var Lo = null;

function Do(e, n, r) {
    if (!("performance" in n)) return () => {};
    if (Lo) return bo.warn("Network observer already initialised, doing nothing"), () => {};
    var i = r ? Object.assign({}, uo, r) : uo,
        o = n => {
            var r = [];
            n.requests.forEach((e => {
                var t = i.maskRequestFn(e);
                t && r.push(t)
            })), r.length > 0 && e(t(t({}, n), {}, {
                requests: r
            }))
        },
        s = Co(o, n, i),
        a = () => {},
        l = () => {};
    return (i.recordHeaders || i.recordBody) && (a = function(e, t, n) {
        if (!n.initiatorTypes.includes("xmlhttprequest")) return () => {};
        var r = Io("request", n.recordHeaders),
            i = Io("response", n.recordHeaders),
            o = _o(t.XMLHttpRequest.prototype, "open", (o => function(s, a) {
                var l, c, u = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                    d = arguments.length > 3 ? arguments[3] : void 0,
                    h = arguments.length > 4 ? arguments[4] : void 0,
                    p = this,
                    v = new Request(a),
                    g = {},
                    f = {},
                    m = p.setRequestHeader.bind(p);
                p.setRequestHeader = (e, t) => (f[e] = t, m(e, t)), r && (g.requestHeaders = f);
                var _ = p.send.bind(p);
                p.send = e => (ko({
                    type: "request",
                    headers: f,
                    url: a,
                    recordBody: n.recordBody
                }) && (g.requestBody = To({
                    body: e,
                    options: n,
                    url: a
                })), l = t.performance.now(), _(e)), p.addEventListener("readystatechange", (() => {
                    if (p.readyState === p.DONE) {
                        c = t.performance.now();
                        var r = {};
                        p.getAllResponseHeaders().trim().split(/[\r\n]+/).forEach((e => {
                            var t = e.split(": "),
                                n = t.shift(),
                                i = t.join(": ");
                            n && (r[n] = i)
                        })), i && (g.responseHeaders = r), ko({
                            type: "response",
                            headers: r,
                            url: a,
                            recordBody: n.recordBody
                        }) && (g.responseBody = To({
                            body: p.response,
                            options: n,
                            url: a
                        })), Eo(t, "xmlhttprequest", v.url, l, c).then((t => {
                            var n = Ro({
                                entry: t,
                                method: s,
                                status: null == p ? void 0 : p.status,
                                networkRequest: g,
                                start: l,
                                end: c,
                                url: a.toString(),
                                initiatorType: "xmlhttprequest"
                            });
                            e({
                                requests: n
                            })
                        })).catch((() => {}))
                    }
                })), o.call(p, s, a, u, d, h)
            }));
        return () => {
            o()
        }
    }(o, n, i), l = Po(o, n, i)), Lo = () => {
        s(), a(), l()
    }
}
var Bo, qo, Ho, $o = e => ({
    name: "rrweb/network@1",
    observer: Do,
    options: e
});
tr.__PosthogExtensions__ = tr.__PosthogExtensions__ || {}, tr.__PosthogExtensions__.rrwebPlugins = {
        getRecordConsolePlugin: Wn,
        getRecordNetworkPlugin: $o
    }, tr.__PosthogExtensions__.rrweb = {
        record: $t,
        version: "v2"
    }, tr.rrweb = {
        record: $t,
        version: "v2"
    }, tr.rrwebConsoleRecord = {
        getRecordConsolePlugin: Wn
    }, tr.getRecordNetworkPlugin = $o,
    function(e) {
        e.Popover = "popover", e.API = "api", e.Widget = "widget"
    }(Bo || (Bo = {})),
    function(e) {
        e.Open = "open", e.MultipleChoice = "multiple_choice", e.SingleChoice = "single_choice", e.Rating = "rating", e.Link = "link"
    }(qo || (qo = {})),
    function(e) {
        e.NextQuestion = "next_question", e.End = "end", e.ResponseBased = "response_based", e.SpecificQuestion = "specific_question"
    }(Ho || (Ho = {}));
var Wo, Vo, Zo, Go, Uo, jo, zo, Yo, Xo = {},
    Jo = [],
    Ko = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
    Qo = Array.isArray;

function es(e, t) {
    for (var n in t) e[n] = t[n];
    return e
}

function ts(e) {
    var t = e.parentNode;
    t && t.removeChild(e)
}

function ns(e, t, n) {
    var r, i, o, s = {};
    for (o in t) "key" == o ? r = t[o] : "ref" == o ? i = t[o] : s[o] = t[o];
    if (arguments.length > 2 && (s.children = arguments.length > 3 ? Wo.call(arguments, 2) : n), "function" == typeof e && null != e.defaultProps)
        for (o in e.defaultProps) void 0 === s[o] && (s[o] = e.defaultProps[o]);
    return rs(e, s, r, i, null)
}

function rs(e, t, n, r, i) {
    var o = {
        type: e,
        props: t,
        key: n,
        ref: r,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        constructor: void 0,
        __v: null == i ? ++Zo : i,
        __i: -1,
        __u: 0
    };
    return null == i && null != Vo.vnode && Vo.vnode(o), o
}

function is(e) {
    return e.children
}

function os(e, t) {
    this.props = e, this.context = t
}

function ss(e, t) {
    if (null == t) return e.__ ? ss(e.__, e.__i + 1) : null;
    for (var n; t < e.__k.length; t++)
        if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
    return "function" == typeof e.type ? ss(e) : null
}

function as(e) {
    var t, n;
    if (null != (e = e.__) && null != e.__c) {
        for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
            if (null != (n = e.__k[t]) && null != n.__e) {
                e.__e = e.__c.base = n.__e;
                break
            } return as(e)
    }
}

function ls(e) {
    (!e.__d && (e.__d = !0) && Go.push(e) && !cs.__r++ || Uo !== Vo.debounceRendering) && ((Uo = Vo.debounceRendering) || jo)(cs)
}

function cs() {
    var e, t, n, r, i, o, s, a, l;
    for (Go.sort(zo); e = Go.shift();) e.__d && (t = Go.length, r = void 0, o = (i = (n = e).__v).__e, a = [], l = [], (s = n.__P) && ((r = es({}, i)).__v = i.__v + 1, Vo.vnode && Vo.vnode(r), ms(s, r, i, n.__n, void 0 !== s.ownerSVGElement, 32 & i.__u ? [o] : null, a, null == o ? ss(i) : o, !!(32 & i.__u), l), r.__.__k[r.__i] = r, _s(a, r, l), r.__e != o && as(r)), Go.length > t && Go.sort(zo));
    cs.__r = 0
}

function us(e, t, n, r, i, o, s, a, l, c, u) {
    var d, h, p, v, g, f = r && r.__k || Jo,
        m = t.length;
    for (n.__d = l, function(e, t, n) {
            var r, i, o, s, a, l = t.length,
                c = n.length,
                u = c,
                d = 0;
            for (e.__k = [], r = 0; r < l; r++) null != (i = e.__k[r] = null == (i = t[r]) || "boolean" == typeof i || "function" == typeof i ? null : "string" == typeof i || "number" == typeof i || "bigint" == typeof i || i.constructor == String ? rs(null, i, null, null, i) : Qo(i) ? rs(is, {
                children: i
            }, null, null, null) : void 0 === i.constructor && i.__b > 0 ? rs(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i) ? (i.__ = e, i.__b = e.__b + 1, a = hs(i, n, s = r + d, u), i.__i = a, o = null, -1 !== a && (u--, (o = n[a]) && (o.__u |= 131072)), null == o || null === o.__v ? (-1 == a && d--, "function" != typeof i.type && (i.__u |= 65536)) : a !== s && (a === s + 1 ? d++ : a > s ? u > l - s ? d += a - s : d-- : d = a < s && a == s - 1 ? a - s : 0, a !== r + d && (i.__u |= 65536))) : (o = n[r]) && null == o.key && o.__e && (o.__e == e.__d && (e.__d = ss(o)), bs(o, o, !1), n[r] = null, u--);
            if (u)
                for (r = 0; r < c; r++) null != (o = n[r]) && 0 == (131072 & o.__u) && (o.__e == e.__d && (e.__d = ss(o)), bs(o, o))
        }(n, t, f), l = n.__d, d = 0; d < m; d++) null != (p = n.__k[d]) && "boolean" != typeof p && "function" != typeof p && (h = -1 === p.__i ? Xo : f[p.__i] || Xo, p.__i = d, ms(e, p, h, i, o, s, a, l, c, u), v = p.__e, p.ref && h.ref != p.ref && (h.ref && ys(h.ref, null, p), u.push(p.ref, p.__c || v, p)), null == g && null != v && (g = v), 65536 & p.__u || h.__k === p.__k ? l = ds(p, l, e) : "function" == typeof p.type && void 0 !== p.__d ? l = p.__d : v && (l = v.nextSibling), p.__d = void 0, p.__u &= -196609);
    n.__d = l, n.__e = g
}

function ds(e, t, n) {
    var r, i;
    if ("function" == typeof e.type) {
        for (r = e.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = e, t = ds(r[i], t, n));
        return t
    }
    return e.__e != t && (n.insertBefore(e.__e, t || null), t = e.__e), t && t.nextSibling
}

function hs(e, t, n, r) {
    var i = e.key,
        o = e.type,
        s = n - 1,
        a = n + 1,
        l = t[n];
    if (null === l || l && i == l.key && o === l.type) return n;
    if (r > (null != l && 0 == (131072 & l.__u) ? 1 : 0))
        for (; s >= 0 || a < t.length;) {
            if (s >= 0) {
                if ((l = t[s]) && 0 == (131072 & l.__u) && i == l.key && o === l.type) return s;
                s--
            }
            if (a < t.length) {
                if ((l = t[a]) && 0 == (131072 & l.__u) && i == l.key && o === l.type) return a;
                a++
            }
        }
    return -1
}

function ps(e, t, n) {
    "-" === t[0] ? e.setProperty(t, null == n ? "" : n) : e[t] = null == n ? "" : "number" != typeof n || Ko.test(t) ? n : n + "px"
}

function vs(e, t, n, r, i) {
    var o;
    e: if ("style" === t)
        if ("string" == typeof n) e.style.cssText = n;
        else {
            if ("string" == typeof r && (e.style.cssText = r = ""), r)
                for (t in r) n && t in n || ps(e.style, t, "");
            if (n)
                for (t in n) r && n[t] === r[t] || ps(e.style, t, n[t])
        }
    else if ("o" === t[0] && "n" === t[1]) o = t !== (t = t.replace(/(PointerCapture)$|Capture$/, "$1")), t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + o] = n, n ? r ? n.u = r.u : (n.u = Date.now(), e.addEventListener(t, o ? fs : gs, o)) : e.removeEventListener(t, o ? fs : gs, o);
    else {
        if (i) t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" !== t && "height" !== t && "href" !== t && "list" !== t && "form" !== t && "tabIndex" !== t && "download" !== t && "rowSpan" !== t && "colSpan" !== t && "role" !== t && t in e) try {
            e[t] = null == n ? "" : n;
            break e
        } catch (e) {}
        "function" == typeof n || (null == n || !1 === n && "-" !== t[4] ? e.removeAttribute(t) : e.setAttribute(t, n))
    }
}

function gs(e) {
    var t = this.l[e.type + !1];
    if (e.t) {
        if (e.t <= t.u) return
    } else e.t = Date.now();
    return t(Vo.event ? Vo.event(e) : e)
}

function fs(e) {
    return this.l[e.type + !0](Vo.event ? Vo.event(e) : e)
}

function ms(e, t, n, r, i, o, s, a, l, c) {
    var u, d, h, p, v, g, f, m, _, y, b, w, S, C, I, k = t.type;
    if (void 0 !== t.constructor) return null;
    128 & n.__u && (l = !!(32 & n.__u), o = [a = t.__e = n.__e]), (u = Vo.__b) && u(t);
    e: if ("function" == typeof k) try {
        if (m = t.props, _ = (u = k.contextType) && r[u.__c], y = u ? _ ? _.props.value : u.__ : r, n.__c ? f = (d = t.__c = n.__c).__ = d.__E : ("prototype" in k && k.prototype.render ? t.__c = d = new k(m, y) : (t.__c = d = new os(m, y), d.constructor = k, d.render = ws), _ && _.sub(d), d.props = m, d.state || (d.state = {}), d.context = y, d.__n = r, h = d.__d = !0, d.__h = [], d._sb = []), null == d.__s && (d.__s = d.state), null != k.getDerivedStateFromProps && (d.__s == d.state && (d.__s = es({}, d.__s)), es(d.__s, k.getDerivedStateFromProps(m, d.__s))), p = d.props, v = d.state, d.__v = t, h) null == k.getDerivedStateFromProps && null != d.componentWillMount && d.componentWillMount(), null != d.componentDidMount && d.__h.push(d.componentDidMount);
        else {
            if (null == k.getDerivedStateFromProps && m !== p && null != d.componentWillReceiveProps && d.componentWillReceiveProps(m, y), !d.__e && (null != d.shouldComponentUpdate && !1 === d.shouldComponentUpdate(m, d.__s, y) || t.__v === n.__v)) {
                for (t.__v !== n.__v && (d.props = m, d.state = d.__s, d.__d = !1), t.__e = n.__e, t.__k = n.__k, t.__k.forEach((function(e) {
                        e && (e.__ = t)
                    })), b = 0; b < d._sb.length; b++) d.__h.push(d._sb[b]);
                d._sb = [], d.__h.length && s.push(d);
                break e
            }
            null != d.componentWillUpdate && d.componentWillUpdate(m, d.__s, y), null != d.componentDidUpdate && d.__h.push((function() {
                d.componentDidUpdate(p, v, g)
            }))
        }
        if (d.context = y, d.props = m, d.__P = e, d.__e = !1, w = Vo.__r, S = 0, "prototype" in k && k.prototype.render) {
            for (d.state = d.__s, d.__d = !1, w && w(t), u = d.render(d.props, d.state, d.context), C = 0; C < d._sb.length; C++) d.__h.push(d._sb[C]);
            d._sb = []
        } else
            do {
                d.__d = !1, w && w(t), u = d.render(d.props, d.state, d.context), d.state = d.__s
            } while (d.__d && ++S < 25);
        d.state = d.__s, null != d.getChildContext && (r = es(es({}, r), d.getChildContext())), h || null == d.getSnapshotBeforeUpdate || (g = d.getSnapshotBeforeUpdate(p, v)), us(e, Qo(I = null != u && u.type === is && null == u.key ? u.props.children : u) ? I : [I], t, n, r, i, o, s, a, l, c), d.base = t.__e, t.__u &= -161, d.__h.length && s.push(d), f && (d.__E = d.__ = null)
    } catch (e) {
        t.__v = null, l || null != o ? (t.__e = a, t.__u |= l ? 160 : 32, o[o.indexOf(a)] = null) : (t.__e = n.__e, t.__k = n.__k), Vo.__e(e, t, n)
    } else null == o && t.__v === n.__v ? (t.__k = n.__k, t.__e = n.__e) : t.__e = function(e, t, n, r, i, o, s, a, l) {
        var c, u, d, h, p, v, g, f = n.props,
            m = t.props,
            _ = t.type;
        if ("svg" === _ && (i = !0), null != o)
            for (c = 0; c < o.length; c++)
                if ((p = o[c]) && "setAttribute" in p == !!_ && (_ ? p.localName === _ : 3 === p.nodeType)) {
                    e = p, o[c] = null;
                    break
                } if (null == e) {
            if (null === _) return document.createTextNode(m);
            e = i ? document.createElementNS("http://www.w3.org/2000/svg", _) : document.createElement(_, m.is && m), o = null, a = !1
        }
        if (null === _) f === m || a && e.data === m || (e.data = m);
        else {
            if (o = o && Wo.call(e.childNodes), f = n.props || Xo, !a && null != o)
                for (f = {}, c = 0; c < e.attributes.length; c++) f[(p = e.attributes[c]).name] = p.value;
            for (c in f) p = f[c], "children" == c || ("dangerouslySetInnerHTML" == c ? d = p : "key" === c || c in m || vs(e, c, null, p, i));
            for (c in m) p = m[c], "children" == c ? h = p : "dangerouslySetInnerHTML" == c ? u = p : "value" == c ? v = p : "checked" == c ? g = p : "key" === c || a && "function" != typeof p || f[c] === p || vs(e, c, p, f[c], i);
            if (u) a || d && (u.__html === d.__html || u.__html === e.innerHTML) || (e.innerHTML = u.__html), t.__k = [];
            else if (d && (e.innerHTML = ""), us(e, Qo(h) ? h : [h], t, n, r, i && "foreignObject" !== _, o, s, o ? o[0] : n.__k && ss(n, 0), a, l), null != o)
                for (c = o.length; c--;) null != o[c] && ts(o[c]);
            a || (c = "value", void 0 !== v && (v !== e[c] || "progress" === _ && !v || "option" === _ && v !== f[c]) && vs(e, c, v, f[c], !1), c = "checked", void 0 !== g && g !== e[c] && vs(e, c, g, f[c], !1))
        }
        return e
    }(n.__e, t, n, r, i, o, s, l, c);
    (u = Vo.diffed) && u(t)
}

function _s(e, t, n) {
    t.__d = void 0;
    for (var r = 0; r < n.length; r++) ys(n[r], n[++r], n[++r]);
    Vo.__c && Vo.__c(t, e), e.some((function(t) {
        try {
            e = t.__h, t.__h = [], e.some((function(e) {
                e.call(t)
            }))
        } catch (e) {
            Vo.__e(e, t.__v)
        }
    }))
}

function ys(e, t, n) {
    try {
        "function" == typeof e ? e(t) : e.current = t
    } catch (e) {
        Vo.__e(e, n)
    }
}

function bs(e, t, n) {
    var r, i;
    if (Vo.unmount && Vo.unmount(e), (r = e.ref) && (r.current && r.current !== e.__e || ys(r, null, t)), null != (r = e.__c)) {
        if (r.componentWillUnmount) try {
            r.componentWillUnmount()
        } catch (e) {
            Vo.__e(e, t)
        }
        r.base = r.__P = null, e.__c = void 0
    }
    if (r = e.__k)
        for (i = 0; i < r.length; i++) r[i] && bs(r[i], t, n || "function" != typeof e.type);
    n || null == e.__e || ts(e.__e), e.__ = e.__e = e.__d = void 0
}

function ws(e, t, n) {
    return this.constructor(e, n)
}

function Ss(e, t, n) {
    var r, i, o, s;
    Vo.__ && Vo.__(e, t), i = (r = "function" == typeof n) ? null : t.__k, o = [], s = [], ms(t, e = (!r && n || t).__k = ns(is, null, [e]), i || Xo, Xo, void 0 !== t.ownerSVGElement, !r && n ? [n] : i ? null : t.firstChild ? Wo.call(t.childNodes) : null, o, !r && n ? n : i ? i.__e : t.firstChild, r, s), _s(o, e, s)
}

function Cs(e, t, n) {
    var r, i, o, s, a = es({}, e.props);
    for (o in e.type && e.type.defaultProps && (s = e.type.defaultProps), t) "key" == o ? r = t[o] : "ref" == o ? i = t[o] : a[o] = void 0 === t[o] && void 0 !== s ? s[o] : t[o];
    return arguments.length > 2 && (a.children = arguments.length > 3 ? Wo.call(arguments, 2) : n), rs(e.type, a, r || e.key, i || e.ref, null)
}
Wo = Jo.slice, Vo = {
    __e: function(e, t, n, r) {
        for (var i, o, s; t = t.__;)
            if ((i = t.__c) && !i.__) try {
                if ((o = i.constructor) && null != o.getDerivedStateFromError && (i.setState(o.getDerivedStateFromError(e)), s = i.__d), null != i.componentDidCatch && (i.componentDidCatch(e, r || {}), s = i.__d), s) return i.__E = i
            } catch (t) {
                e = t
            }
        throw e
    }
}, Zo = 0, os.prototype.setState = function(e, t) {
    var n;
    n = null != this.__s && this.__s !== this.state ? this.__s : this.__s = es({}, this.state), "function" == typeof e && (e = e(es({}, n), this.props)), e && es(n, e), null != e && this.__v && (t && this._sb.push(t), ls(this))
}, os.prototype.forceUpdate = function(e) {
    this.__v && (this.__e = !0, e && this.__h.push(e), ls(this))
}, os.prototype.render = is, Go = [], jo = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, zo = function(e, t) {
    return e.__v.__b - t.__v.__b
}, cs.__r = 0, Yo = 0;
var Is, ks, Es, xs, Ts = 0,
    Ms = [],
    Rs = [],
    As = Vo.__b,
    Ns = Vo.__r,
    Fs = Vo.diffed,
    Os = Vo.__c,
    Ps = Vo.unmount;

function Ls(e, t) {
    Vo.__h && Vo.__h(ks, e, Ts || t), Ts = 0;
    var n = ks.__H || (ks.__H = {
        __: [],
        __h: []
    });
    return e >= n.__.length && n.__.push({
        __V: Rs
    }), n.__[e]
}

function Ds(e) {
    return Ts = 1,
        function(e, t, n) {
            var r = Ls(Is++, 2);
            if (r.t = e, !r.__c && (r.__ = [zs(void 0, t), function(e) {
                    var t = r.__N ? r.__N[0] : r.__[0],
                        n = r.t(t, e);
                    t !== n && (r.__N = [n, r.__[1]], r.__c.setState({}))
                }], r.__c = ks, !ks.u)) {
                var i = function(e, t, n) {
                    if (!r.__c.__H) return !0;
                    var i = r.__c.__H.__.filter((function(e) {
                        return e.__c
                    }));
                    if (i.every((function(e) {
                            return !e.__N
                        }))) return !o || o.call(this, e, t, n);
                    var s = !1;
                    return i.forEach((function(e) {
                        if (e.__N) {
                            var t = e.__[0];
                            e.__ = e.__N, e.__N = void 0, t !== e.__[0] && (s = !0)
                        }
                    })), !(!s && r.__c.props === e) && (!o || o.call(this, e, t, n))
                };
                ks.u = !0;
                var o = ks.shouldComponentUpdate,
                    s = ks.componentWillUpdate;
                ks.componentWillUpdate = function(e, t, n) {
                    if (this.__e) {
                        var r = o;
                        o = void 0, i(e, t, n), o = r
                    }
                    s && s.call(this, e, t, n)
                }, ks.shouldComponentUpdate = i
            }
            return r.__N || r.__
        }(zs, e)
}

function Bs(e, t) {
    var n = Ls(Is++, 3);
    !Vo.__s && js(n.__H, t) && (n.__ = e, n.i = t, ks.__H.__h.push(n))
}

function qs(e) {
    return Ts = 5, Hs((function() {
        return {
            current: e
        }
    }), [])
}

function Hs(e, t) {
    var n = Ls(Is++, 7);
    return js(n.__H, t) ? (n.__V = e(), n.i = t, n.__h = e, n.__V) : n.__
}

function $s(e) {
    var t = ks.context[e.__c],
        n = Ls(Is++, 9);
    return n.c = e, t ? (null == n.__ && (n.__ = !0, t.sub(ks)), t.props.value) : e.__
}

function Ws() {
    for (var e; e = Ms.shift();)
        if (e.__P && e.__H) try {
            e.__H.__h.forEach(Gs), e.__H.__h.forEach(Us), e.__H.__h = []
        } catch (t) {
            e.__H.__h = [], Vo.__e(t, e.__v)
        }
}
Vo.__b = function(e) {
    ks = null, As && As(e)
}, Vo.__r = function(e) {
    Ns && Ns(e), Is = 0;
    var t = (ks = e.__c).__H;
    t && (Es === ks ? (t.__h = [], ks.__h = [], t.__.forEach((function(e) {
        e.__N && (e.__ = e.__N), e.__V = Rs, e.__N = e.i = void 0
    }))) : (t.__h.forEach(Gs), t.__h.forEach(Us), t.__h = [], Is = 0)), Es = ks
}, Vo.diffed = function(e) {
    Fs && Fs(e);
    var t = e.__c;
    t && t.__H && (t.__H.__h.length && (1 !== Ms.push(t) && xs === Vo.requestAnimationFrame || ((xs = Vo.requestAnimationFrame) || Zs)(Ws)), t.__H.__.forEach((function(e) {
        e.i && (e.__H = e.i), e.__V !== Rs && (e.__ = e.__V), e.i = void 0, e.__V = Rs
    }))), Es = ks = null
}, Vo.__c = function(e, t) {
    t.some((function(e) {
        try {
            e.__h.forEach(Gs), e.__h = e.__h.filter((function(e) {
                return !e.__ || Us(e)
            }))
        } catch (n) {
            t.some((function(e) {
                e.__h && (e.__h = [])
            })), t = [], Vo.__e(n, e.__v)
        }
    })), Os && Os(e, t)
}, Vo.unmount = function(e) {
    Ps && Ps(e);
    var t, n = e.__c;
    n && n.__H && (n.__H.__.forEach((function(e) {
        try {
            Gs(e)
        } catch (e) {
            t = e
        }
    })), n.__H = void 0, t && Vo.__e(t, n.__v))
};
var Vs = "function" == typeof requestAnimationFrame;

function Zs(e) {
    var t, n = function() {
            clearTimeout(r), Vs && cancelAnimationFrame(t), setTimeout(e)
        },
        r = setTimeout(n, 100);
    Vs && (t = requestAnimationFrame(n))
}

function Gs(e) {
    var t = ks,
        n = e.__c;
    "function" == typeof n && (e.__c = void 0, n()), ks = t
}

function Us(e) {
    var t = ks;
    e.__c = e.__(), ks = t
}

function js(e, t) {
    return !e || e.length !== t.length || t.some((function(t, n) {
        return t !== e[n]
    }))
}

function zs(e, t) {
    return "function" == typeof t ? t(e) : t
}
var Ys = Yn;
var Xs = Vn,
    Js = Yn,
    Ks = "seenSurvey_",
    Qs = e => "\n          .survey-form, .thank-you-message {\n              position: fixed;\n              margin: 0px;\n              bottom: 0px;\n              color: black;\n              font-weight: normal;\n              font-family: ".concat((null == e ? void 0 : e.fontFamily) || "-apple-system", ', BlinkMacSystemFont, "Inter", "Segoe UI", "Roboto", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n              text-align: left;\n              max-width: ').concat(parseInt((null == e ? void 0 : e.maxWidth) || "300"), "px;\n              width: 100%;\n              z-index: ").concat(parseInt((null == e ? void 0 : e.zIndex) || "99999"), ";\n              border: 1.5px solid ").concat((null == e ? void 0 : e.borderColor) || "#c9c6c6", ";\n              border-bottom: 0px;\n              ").concat({
        left: "left: 30px;",
        right: "right: 30px;",
        center: "\n            left: 50%;\n            transform: translateX(-50%);\n          "
    } [(null == e ? void 0 : e.position) || "right"] || "right: 30px;", "\n              flex-direction: column;\n              background: ").concat((null == e ? void 0 : e.backgroundColor) || "#eeeded", ";\n              border-top-left-radius: 10px;\n              border-top-right-radius: 10px;\n              box-shadow: -6px 0 16px -8px rgb(0 0 0 / 8%), -9px 0 28px 0 rgb(0 0 0 / 5%), -12px 0 48px 16px rgb(0 0 0 / 3%);\n          }\n\n          .survey-box, .thank-you-message-container {\n              padding: 20px 25px 10px;\n              display: flex;\n              flex-direction: column;\n              border-radius: 10px;\n          }\n\n          .thank-you-message {\n              text-align: center;\n          }\n\n          .form-submit[disabled] {\n              opacity: 0.6;\n              filter: grayscale(50%);\n              cursor: not-allowed;\n          }\n          .survey-form textarea {\n              color: #2d2d2d;\n              font-size: 14px;\n              font-family: ").concat((null == e ? void 0 : e.fontFamily) || "-apple-system", ', BlinkMacSystemFont, "Inter", "Segoe UI", "Roboto", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n              background: white;\n              color: black;\n              outline: none;\n              padding-left: 10px;\n              padding-right: 10px;\n              padding-top: 10px;\n              border-radius: 6px;\n              border-color: ').concat((null == e ? void 0 : e.borderColor) || "#c9c6c6", ";\n              margin-top: 14px;\n              width: 100%;\n              box-sizing: border-box;\n          }\n          .survey-box:has(.survey-question:empty):not(:has(.survey-question-description)) textarea {\n              margin-top: 0;\n          }\n          .form-submit {\n              box-sizing: border-box;\n              margin: 0;\n              font-family: inherit;\n              overflow: visible;\n              text-transform: none;\n              position: relative;\n              display: inline-block;\n              font-weight: 700;\n              white-space: nowrap;\n              text-align: center;\n              border: 1.5px solid transparent;\n              cursor: pointer;\n              user-select: none;\n              touch-action: manipulation;\n              padding: 12px;\n              font-size: 14px;\n              border-radius: 6px;\n              outline: 0;\n              background: ").concat((null == e ? void 0 : e.submitButtonColor) || "black", " !important;\n              text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);\n              box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);\n              width: 100%;\n          }\n          .form-cancel {\n              display: flex;\n              float: right;\n              border: none;\n              background: none;\n              cursor: pointer;\n          }\n          .cancel-btn-wrapper {\n              position: absolute;\n              width: 35px;\n              height: 35px;\n              border-radius: 100%;\n              top: 0;\n              right: 0;\n              transform: translate(50%, -50%);\n              background: white;\n              border: 1.5px solid ").concat((null == e ? void 0 : e.borderColor) || "#c9c6c6", ";\n              display: flex;\n              justify-content: center;\n              align-items: center;\n          }\n          .bolded { font-weight: 600; }\n          .buttons {\n              display: flex;\n              justify-content: center;\n          }\n          .footer-branding {\n              font-size: 11px;\n              margin-top: 10px;\n              text-align: center;\n              display: flex;\n              justify-content: center;\n              gap: 4px;\n              align-items: center;\n              font-weight: 500;\n              background: ").concat((null == e ? void 0 : e.backgroundColor) || "#eeeded", ";\n              text-decoration: none;\n              backgroundColor: ").concat((null == e ? void 0 : e.backgroundColor) || "#eeeded", ";\n              color: ").concat(ta((null == e ? void 0 : e.backgroundColor) || "#eeeded"), ";\n          }\n          .survey-question {\n              font-weight: 500;\n              font-size: 14px;\n              background: ").concat((null == e ? void 0 : e.backgroundColor) || "#eeeded", ";\n          }\n          .question-textarea-wrapper {\n              display: flex;\n              flex-direction: column;\n          }\n          .survey-question-description {\n              font-size: 13px;\n              padding-top: 5px;\n              background: ").concat((null == e ? void 0 : e.backgroundColor) || "#eeeded", ";\n          }\n          .ratings-number {\n              font-size: 16px;\n              font-weight: 600;\n              padding: 8px 0px;\n              border: none;\n          }\n          .ratings-number:hover {\n              cursor: pointer;\n          }\n          .rating-options {\n              margin-top: 14px;\n          }\n          .rating-options-number {\n              display: grid;\n              border-radius: 6px;\n              overflow: hidden;\n              border: 1.5px solid ").concat((null == e ? void 0 : e.borderColor) || "#c9c6c6", ";\n          }\n          .rating-options-number > .ratings-number {\n              border-right: 1px solid ").concat((null == e ? void 0 : e.borderColor) || "#c9c6c6", ";\n          }\n          .rating-options-number > .ratings-number:last-of-type {\n              border-right: 0px;\n          }\n          .rating-options-number .rating-active {\n              background: ").concat((null == e ? void 0 : e.ratingButtonActiveColor) || "black", ";\n          }\n          .rating-options-emoji {\n              display: flex;\n              justify-content: space-between;\n          }\n          .ratings-emoji {\n              font-size: 16px;\n              background-color: transparent;\n              border: none;\n              padding: 0px;\n          }\n          .ratings-emoji:hover {\n              cursor: pointer;\n          }\n          .ratings-emoji.rating-active svg {\n              fill: ").concat((null == e ? void 0 : e.ratingButtonActiveColor) || "black", ";\n          }\n          .emoji-svg {\n              fill: '#939393';\n          }\n          .rating-text {\n              display: flex;\n              flex-direction: row;\n              font-size: 11px;\n              justify-content: space-between;\n              margin-top: 6px;\n              background: ").concat((null == e ? void 0 : e.backgroundColor) || "#eeeded", ";\n              opacity: .60;\n          }\n          .multiple-choice-options {\n              margin-top: 13px;\n              font-size: 14px;\n          }\n          .survey-box:has(.survey-question:empty):not(:has(.survey-question-description)) .multiple-choice-options {\n              margin-top: 0;\n          }\n          .multiple-choice-options .choice-option {\n              display: flex;\n              align-items: center;\n              gap: 4px;\n              font-size: 13px;\n              cursor: pointer;\n              margin-bottom: 5px;\n              position: relative;\n          }\n          .multiple-choice-options > .choice-option:last-of-type {\n              margin-bottom: 0px;\n          }\n          .multiple-choice-options input {\n              cursor: pointer;\n              position: absolute;\n              opacity: 0;\n          }\n          .choice-check {\n              position: absolute;\n              right: 10px;\n              background: white;\n          }\n          .choice-check svg {\n              display: none;\n          }\n          .multiple-choice-options .choice-option:hover .choice-check svg {\n              display: inline-block;\n              opacity: .25;\n          }\n          .multiple-choice-options input:checked + label + .choice-check svg {\n              display: inline-block;\n              opacity: 100% !important;\n          }\n          .multiple-choice-options input:checked + label {\n              font-weight: bold;\n              border: 1.5px solid rgba(0,0,0);\n          }\n          .multiple-choice-options input:checked + label input {\n              font-weight: bold;\n          }\n          .multiple-choice-options label {\n              width: 100%;\n              cursor: pointer;\n              padding: 10px;\n              border: 1.5px solid rgba(0,0,0,.25);\n              border-radius: 4px;\n              background: white;\n          }\n          .multiple-choice-options .choice-option-open label {\n              padding-right: 30px;\n              display: flex;\n              flex-wrap: wrap;\n              gap: 8px;\n              max-width: 100%;\n          }\n          .multiple-choice-options .choice-option-open label span {\n              width: 100%;\n          }\n          .multiple-choice-options .choice-option-open input:disabled + label {\n              opacity: 0.6;\n          }\n          .multiple-choice-options .choice-option-open label input {\n              position: relative;\n              opacity: 1;\n              flex-grow: 1;\n              border: 0;\n              outline: 0;\n          }\n          .thank-you-message-body {\n              margin-top: 6px;\n              font-size: 14px;\n              background: ").concat((null == e ? void 0 : e.backgroundColor) || "#eeeded", ";\n          }\n          .thank-you-message-header {\n              margin: 10px 0px 0px;\n              background: ").concat((null == e ? void 0 : e.backgroundColor) || "#eeeded", ";\n          }\n          .thank-you-message-container .form-submit {\n              margin-top: 20px;\n              margin-bottom: 10px;\n          }\n          .thank-you-message-countdown {\n              margin-left: 6px;\n          }\n          .bottom-section {\n              margin-top: 14px;\n          }\n          ");

function ea(e) {
    if ("#" === e[0]) {
        var t = e.replace(/^#/, "");
        return "rgb(" + parseInt(t.slice(0, 2), 16) + "," + parseInt(t.slice(2, 4), 16) + "," + parseInt(t.slice(4, 6), 16) + ")"
    }
    return "rgb(255, 255, 255)"
}

function ta() {
    var e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ra;
    "#" === t[0] && (e = ea(t)), t.startsWith("rgb") && (e = t);
    var n = function(e) {
        return {
            aliceblue: "#f0f8ff",
            antiquewhite: "#faebd7",
            aqua: "#00ffff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000000",
            blanchedalmond: "#ffebcd",
            blue: "#0000ff",
            blueviolet: "#8a2be2",
            brown: "#a52a2a",
            burlywood: "#deb887",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerblue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkgray: "#a9a9a9",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkseagreen: "#8fbc8f",
            darkslateblue: "#483d8b",
            darkslategray: "#2f4f4f",
            darkturquoise: "#00ced1",
            darkviolet: "#9400d3",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            dimgray: "#696969",
            dodgerblue: "#1e90ff",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            forestgreen: "#228b22",
            fuchsia: "#ff00ff",
            gainsboro: "#dcdcdc",
            ghostwhite: "#f8f8ff",
            gold: "#ffd700",
            goldenrod: "#daa520",
            gray: "#808080",
            green: "#008000",
            greenyellow: "#adff2f",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            "indianred ": "#cd5c5c",
            indigo: "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavender: "#e6e6fa",
            lavenderblush: "#fff0f5",
            lawngreen: "#7cfc00",
            lemonchiffon: "#fffacd",
            lightblue: "#add8e6",
            lightcoral: "#f08080",
            lightcyan: "#e0ffff",
            lightgoldenrodyellow: "#fafad2",
            lightgrey: "#d3d3d3",
            lightgreen: "#90ee90",
            lightpink: "#ffb6c1",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            lightskyblue: "#87cefa",
            lightslategray: "#778899",
            lightsteelblue: "#b0c4de",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            limegreen: "#32cd32",
            linen: "#faf0e6",
            magenta: "#ff00ff",
            maroon: "#800000",
            mediumaquamarine: "#66cdaa",
            mediumblue: "#0000cd",
            mediumorchid: "#ba55d3",
            mediumpurple: "#9370d8",
            mediumseagreen: "#3cb371",
            mediumslateblue: "#7b68ee",
            mediumspringgreen: "#00fa9a",
            mediumturquoise: "#48d1cc",
            mediumvioletred: "#c71585",
            midnightblue: "#191970",
            mintcream: "#f5fffa",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajowhite: "#ffdead",
            navy: "#000080",
            oldlace: "#fdf5e6",
            olive: "#808000",
            olivedrab: "#6b8e23",
            orange: "#ffa500",
            orangered: "#ff4500",
            orchid: "#da70d6",
            palegoldenrod: "#eee8aa",
            palegreen: "#98fb98",
            paleturquoise: "#afeeee",
            palevioletred: "#d87093",
            papayawhip: "#ffefd5",
            peachpuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderblue: "#b0e0e6",
            purple: "#800080",
            red: "#ff0000",
            rosybrown: "#bc8f8f",
            royalblue: "#4169e1",
            saddlebrown: "#8b4513",
            salmon: "#fa8072",
            sandybrown: "#f4a460",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            skyblue: "#87ceeb",
            slateblue: "#6a5acd",
            slategray: "#708090",
            snow: "#fffafa",
            springgreen: "#00ff7f",
            steelblue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            wheat: "#f5deb3",
            white: "#ffffff",
            whitesmoke: "#f5f5f5",
            yellow: "#ffff00",
            yellowgreen: "#9acd32"
        } [e.toLowerCase()]
    }(t);
    if (n && (e = ea(n)), !e) return "black";
    var r = e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    if (r) {
        var i = parseInt(r[1]),
            o = parseInt(r[2]),
            s = parseInt(r[3]);
        return Math.sqrt(i * i * .299 + o * o * .587 + s * s * .114) > 127.5 ? "black" : "white"
    }
    return "black"
}
var na = {
        backgroundColor: "#eeeded",
        submitButtonColor: "black",
        submitButtonTextColor: "white",
        ratingButtonColor: "white",
        ratingButtonActiveColor: "black",
        borderColor: "#c9c6c6",
        placeholder: "Start typing...",
        whiteLabel: !1,
        displayThankYouMessage: !0,
        thankYouMessageHeader: "Thank you for your feedback!",
        position: "right"
    },
    ra = "#eeeded",
    ia = function() {
        var e, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            r = arguments.length > 1 ? arguments[1] : void 0,
            i = arguments.length > 2 ? arguments[2] : void 0;
        i && (localStorage.setItem(ua(r), "true"), i.capture("survey sent", t(t({
            $survey_name: r.name,
            $survey_id: r.id,
            $survey_iteration: r.current_iteration,
            $survey_iteration_start_date: r.current_iteration_start_date,
            $survey_questions: r.questions.map((e => e.question)),
            sessionRecordingUrl: null === (e = i.get_session_replay_url) || void 0 === e ? void 0 : e.call(i)
        }, n), {}, {
            $set: {
                [da(r, "responded")]: !0
            }
        })), Xs.dispatchEvent(new Event("PHSurveySent")))
    },
    oa = (e, t, n) => {
        var r;
        !n && t && (t.capture("survey dismissed", {
            $survey_name: e.name,
            $survey_id: e.id,
            $survey_iteration: e.current_iteration,
            $survey_iteration_start_date: e.current_iteration_start_date,
            sessionRecordingUrl: null === (r = t.get_session_replay_url) || void 0 === r ? void 0 : r.call(t),
            $set: {
                [da(e, "dismissed")]: !0
            }
        }), localStorage.setItem(ua(e), "true"), Xs.dispatchEvent(new Event("PHSurveyClosed")))
    },
    sa = e => e.map((e => ({
        sort: Math.floor(10 * Math.random()),
        value: e
    }))).sort(((e, t) => e.sort - t.sort)).map((e => e.value)),
    aa = (e, t) => e.length === t.length && e.every(((e, n) => e === t[n])) ? t.reverse() : t,
    la = e => (e.questions.forEach(((e, t) => {
        e.originalQuestionIndex = t
    })), e.appearance && e.appearance.shuffleQuestions ? aa(e.questions, sa(e.questions)) : e.questions),
    ca = e => {
        var t, n;
        return !(null === (t = e.conditions) || void 0 === t || null === (n = t.events) || void 0 === n || !n.repeatedActivation || !(e => {
            var t, n, r, i, o, s;
            return null != (null === (t = e.conditions) || void 0 === t || null === (n = t.events) || void 0 === n || null === (r = n.values) || void 0 === r ? void 0 : r.length) && (null === (i = e.conditions) || void 0 === i || null === (o = i.events) || void 0 === o || null === (s = o.values) || void 0 === s ? void 0 : s.length) > 0
        })(e))
    },
    ua = e => {
        var t = "".concat(Ks).concat(e.id);
        return e.current_iteration && e.current_iteration > 0 && (t = "".concat(Ks).concat(e.id, "_").concat(e.current_iteration)), t
    },
    da = (e, t) => {
        var n = "$survey_".concat(t, "/").concat(e.id);
        return e.current_iteration && e.current_iteration > 0 && (n = "$survey_".concat(t, "/").concat(e.id, "/").concat(e.current_iteration)), n
    },
    ha = function(e, t) {
        var n = {
            __c: t = "__cC" + Yo++,
            __: e,
            Consumer: function(e, t) {
                return e.children(t)
            },
            Provider: function(e) {
                var n, r;
                return this.getChildContext || (n = [], (r = {})[t] = this, this.getChildContext = function() {
                    return r
                }, this.shouldComponentUpdate = function(e) {
                    this.props.value !== e.value && n.some((function(e) {
                        e.__e = !0, ls(e)
                    }))
                }, this.sub = function(e) {
                    n.push(e);
                    var t = e.componentWillUnmount;
                    e.componentWillUnmount = function() {
                        n.splice(n.indexOf(e), 1), t && t.call(e)
                    }
                }), e.children
            }
        };
        return n.Provider.__ = n.Consumer.contextType = n
    }({
        isPreviewMode: !1,
        previewPageIndex: 0,
        handleCloseSurveyPopup: () => {},
        isPopup: !0,
        onPreviewSubmit: () => {}
    }),
    pa = e => {
        var {
            component: t,
            children: n,
            renderAsHtml: r,
            style: i
        } = e;
        return Cs(t, r ? {
            dangerouslySetInnerHTML: {
                __html: n
            },
            style: i
        } : {
            children: n,
            style: i
        })
    },
    va = 0;

function ga(e, t, n, r, i, o) {
    var s, a, l = {};
    for (a in t) "ref" == a ? s = t[a] : l[a] = t[a];
    var c = {
        type: e,
        props: l,
        key: n,
        ref: s,
        __k: null,
        __: null,
        __b: 0,
        __e: null,
        __d: void 0,
        __c: null,
        constructor: void 0,
        __v: --va,
        __i: -1,
        __u: 0,
        __source: i,
        __self: o
    };
    if ("function" == typeof e && (s = e.defaultProps))
        for (a in s) void 0 === l[a] && (l[a] = s[a]);
    return Vo.vnode && Vo.vnode(c), c
}
var fa = ga("svg", {
        className: "emoji-svg",
        xmlns: "http://www.w3.org/2000/svg",
        height: "48",
        viewBox: "0 -960 960 960",
        width: "48",
        children: ga("path", {
            d: "M626-533q22.5 0 38.25-15.75T680-587q0-22.5-15.75-38.25T626-641q-22.5 0-38.25 15.75T572-587q0 22.5 15.75 38.25T626-533Zm-292 0q22.5 0 38.25-15.75T388-587q0-22.5-15.75-38.25T334-641q-22.5 0-38.25 15.75T280-587q0 22.5 15.75 38.25T334-533Zm146 272q66 0 121.5-35.5T682-393h-52q-23 40-63 61.5T480.5-310q-46.5 0-87-21T331-393h-53q26 61 81 96.5T480-261Zm0 181q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 340q142.375 0 241.188-98.812Q820-337.625 820-480t-98.812-241.188Q622.375-820 480-820t-241.188 98.812Q140-622.375 140-480t98.812 241.188Q337.625-140 480-140Z"
        })
    }),
    ma = ga("svg", {
        className: "emoji-svg",
        xmlns: "http://www.w3.org/2000/svg",
        height: "48",
        viewBox: "0 -960 960 960",
        width: "48",
        children: ga("path", {
            d: "M626-533q22.5 0 38.25-15.75T680-587q0-22.5-15.75-38.25T626-641q-22.5 0-38.25 15.75T572-587q0 22.5 15.75 38.25T626-533Zm-292 0q22.5 0 38.25-15.75T388-587q0-22.5-15.75-38.25T334-641q-22.5 0-38.25 15.75T280-587q0 22.5 15.75 38.25T334-533Zm20 194h253v-49H354v49ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 340q142.375 0 241.188-98.812Q820-337.625 820-480t-98.812-241.188Q622.375-820 480-820t-241.188 98.812Q140-622.375 140-480t98.812 241.188Q337.625-140 480-140Z"
        })
    }),
    _a = ga("svg", {
        className: "emoji-svg",
        xmlns: "http://www.w3.org/2000/svg",
        height: "48",
        viewBox: "0 -960 960 960",
        width: "48",
        children: ga("path", {
            d: "M626-533q22.5 0 38.25-15.75T680-587q0-22.5-15.75-38.25T626-641q-22.5 0-38.25 15.75T572-587q0 22.5 15.75 38.25T626-533Zm-292 0q22.5 0 38.25-15.75T388-587q0-22.5-15.75-38.25T334-641q-22.5 0-38.25 15.75T280-587q0 22.5 15.75 38.25T334-533Zm146.174 116Q413-417 358.5-379.5T278-280h53q22-42 62.173-65t87.5-23Q528-368 567.5-344.5T630-280h52q-25-63-79.826-100-54.826-37-122-37ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 340q142.375 0 241.188-98.812Q820-337.625 820-480t-98.812-241.188Q622.375-820 480-820t-241.188 98.812Q140-622.375 140-480t98.812 241.188Q337.625-140 480-140Z"
        })
    }),
    ya = ga("svg", {
        className: "emoji-svg",
        xmlns: "http://www.w3.org/2000/svg",
        height: "48",
        viewBox: "0 -960 960 960",
        width: "48",
        children: ga("path", {
            d: "M480-417q-67 0-121.5 37.5T278-280h404q-25-63-80-100t-122-37Zm-183-72 50-45 45 45 31-36-45-45 45-45-31-36-45 45-50-45-31 36 45 45-45 45 31 36Zm272 0 44-45 51 45 31-36-45-45 45-45-31-36-51 45-44-45-31 36 44 45-44 45 31 36ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 340q142 0 241-99t99-241q0-142-99-241t-241-99q-142 0-241 99t-99 241q0 142 99 241t241 99Z"
        })
    }),
    ba = ga("svg", {
        className: "emoji-svg",
        xmlns: "http://www.w3.org/2000/svg",
        height: "48",
        viewBox: "0 -960 960 960",
        width: "48",
        children: ga("path", {
            d: "M479.504-261Q537-261 585.5-287q48.5-26 78.5-72.4 6-11.6-.75-22.6-6.75-11-20.25-11H316.918Q303-393 296.5-382t-.5 22.6q30 46.4 78.5 72.4 48.5 26 105.004 26ZM347-578l27 27q7.636 8 17.818 8Q402-543 410-551q8-8 8-18t-8-18l-42-42q-8.8-9-20.9-9-12.1 0-21.1 9l-42 42q-8 7.636-8 17.818Q276-559 284-551q8 8 18 8t18-8l27-27Zm267 0 27 27q7.714 8 18 8t18-8q8-7.636 8-17.818Q685-579 677-587l-42-42q-8.8-9-20.9-9-12.1 0-21.1 9l-42 42q-8 7.714-8 18t8 18q7.636 8 17.818 8Q579-543 587-551l27-27ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 340q142.375 0 241.188-98.812Q820-337.625 820-480t-98.812-241.188Q622.375-820 480-820t-241.188 98.812Q140-622.375 140-480t98.812 241.188Q337.625-140 480-140Z"
        })
    }),
    wa = ga("svg", {
        width: "12",
        height: "12",
        viewBox: "0 0 12 12",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: ga("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M0.164752 0.164752C0.384422 -0.0549175 0.740578 -0.0549175 0.960248 0.164752L6 5.20451L11.0398 0.164752C11.2594 -0.0549175 11.6156 -0.0549175 11.8352 0.164752C12.0549 0.384422 12.0549 0.740578 11.8352 0.960248L6.79549 6L11.8352 11.0398C12.0549 11.2594 12.0549 11.6156 11.8352 11.8352C11.6156 12.0549 11.2594 12.0549 11.0398 11.8352L6 6.79549L0.960248 11.8352C0.740578 12.0549 0.384422 12.0549 0.164752 11.8352C-0.0549175 11.6156 -0.0549175 11.2594 0.164752 11.0398L5.20451 6L0.164752 0.960248C-0.0549175 0.740578 -0.0549175 0.384422 0.164752 0.164752Z",
            fill: "black"
        })
    }),
    Sa = ga("svg", {
        width: "77",
        height: "14",
        viewBox: "0 0 77 14",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [ga("g", {
            "clip-path": "url(#clip0_2415_6911)",
            children: [ga("mask", {
                id: "mask0_2415_6911",
                style: {
                    maskType: "luminance"
                },
                maskUnits: "userSpaceOnUse",
                x: "0",
                y: "0",
                width: "77",
                height: "14",
                children: ga("path", {
                    d: "M0.5 0H76.5V14H0.5V0Z",
                    fill: "white"
                })
            }), ga("g", {
                mask: "url(#mask0_2415_6911)",
                children: [ga("path", {
                    d: "M5.77226 8.02931C5.59388 8.37329 5.08474 8.37329 4.90634 8.02931L4.4797 7.20672C4.41155 7.07535 4.41155 6.9207 4.4797 6.78933L4.90634 5.96669C5.08474 5.62276 5.59388 5.62276 5.77226 5.96669L6.19893 6.78933C6.26709 6.9207 6.26709 7.07535 6.19893 7.20672L5.77226 8.02931ZM5.77226 12.6946C5.59388 13.0386 5.08474 13.0386 4.90634 12.6946L4.4797 11.872C4.41155 11.7406 4.41155 11.586 4.4797 11.4546L4.90634 10.632C5.08474 10.288 5.59388 10.288 5.77226 10.632L6.19893 11.4546C6.26709 11.586 6.26709 11.7406 6.19893 11.872L5.77226 12.6946Z",
                    fill: "#1D4AFF"
                }), ga("path", {
                    d: "M0.5 10.9238C0.5 10.508 1.02142 10.2998 1.32637 10.5938L3.54508 12.7327C3.85003 13.0267 3.63405 13.5294 3.20279 13.5294H0.984076C0.716728 13.5294 0.5 13.3205 0.5 13.0627V10.9238ZM0.5 8.67083C0.5 8.79459 0.551001 8.91331 0.641783 9.00081L5.19753 13.3927C5.28831 13.4802 5.41144 13.5294 5.53982 13.5294H8.0421C8.47337 13.5294 8.68936 13.0267 8.3844 12.7327L1.32637 5.92856C1.02142 5.63456 0.5 5.84278 0.5 6.25854V8.67083ZM0.5 4.00556C0.5 4.12932 0.551001 4.24802 0.641783 4.33554L10.0368 13.3927C10.1276 13.4802 10.2508 13.5294 10.3791 13.5294H12.8814C13.3127 13.5294 13.5287 13.0267 13.2237 12.7327L1.32637 1.26329C1.02142 0.969312 0.5 1.17752 0.5 1.59327V4.00556ZM5.33931 4.00556C5.33931 4.12932 5.39033 4.24802 5.4811 4.33554L14.1916 12.7327C14.4965 13.0267 15.0179 12.8185 15.0179 12.4028V9.99047C15.0179 9.86671 14.9669 9.74799 14.8762 9.66049L6.16568 1.26329C5.86071 0.969307 5.33931 1.17752 5.33931 1.59327V4.00556ZM11.005 1.26329C10.7 0.969307 10.1786 1.17752 10.1786 1.59327V4.00556C10.1786 4.12932 10.2296 4.24802 10.3204 4.33554L14.1916 8.06748C14.4965 8.36148 15.0179 8.15325 15.0179 7.7375V5.3252C15.0179 5.20144 14.9669 5.08272 14.8762 4.99522L11.005 1.26329Z",
                    fill: "#F9BD2B"
                }), ga("path", {
                    d: "M21.0852 10.981L16.5288 6.58843C16.2238 6.29443 15.7024 6.50266 15.7024 6.91841V13.0627C15.7024 13.3205 15.9191 13.5294 16.1865 13.5294H23.2446C23.5119 13.5294 23.7287 13.3205 23.7287 13.0627V12.5032C23.7287 12.2455 23.511 12.0396 23.2459 12.0063C22.4323 11.9042 21.6713 11.546 21.0852 10.981ZM18.0252 12.0365C17.5978 12.0365 17.251 11.7021 17.251 11.2901C17.251 10.878 17.5978 10.5436 18.0252 10.5436C18.4527 10.5436 18.7996 10.878 18.7996 11.2901C18.7996 11.7021 18.4527 12.0365 18.0252 12.0365Z",
                    fill: "currentColor"
                }), ga("path", {
                    d: "M0.5 13.0627C0.5 13.3205 0.716728 13.5294 0.984076 13.5294H3.20279C3.63405 13.5294 3.85003 13.0267 3.54508 12.7327L1.32637 10.5938C1.02142 10.2998 0.5 10.508 0.5 10.9238V13.0627ZM5.33931 5.13191L1.32637 1.26329C1.02142 0.969306 0.5 1.17752 0.5 1.59327V4.00556C0.5 4.12932 0.551001 4.24802 0.641783 4.33554L5.33931 8.86412V5.13191ZM1.32637 5.92855C1.02142 5.63455 0.5 5.84278 0.5 6.25853V8.67083C0.5 8.79459 0.551001 8.91331 0.641783 9.00081L5.33931 13.5294V9.79717L1.32637 5.92855Z",
                    fill: "#1D4AFF"
                }), ga("path", {
                    d: "M10.1787 5.3252C10.1787 5.20144 10.1277 5.08272 10.0369 4.99522L6.16572 1.26329C5.8608 0.969306 5.33936 1.17752 5.33936 1.59327V4.00556C5.33936 4.12932 5.39037 4.24802 5.48114 4.33554L10.1787 8.86412V5.3252ZM5.33936 13.5294H8.04214C8.47341 13.5294 8.6894 13.0267 8.38443 12.7327L5.33936 9.79717V13.5294ZM5.33936 5.13191V8.67083C5.33936 8.79459 5.39037 8.91331 5.48114 9.00081L10.1787 13.5294V9.99047C10.1787 9.86671 10.1277 9.74803 10.0369 9.66049L5.33936 5.13191Z",
                    fill: "#F54E00"
                }), ga("path", {
                    d: "M29.375 11.6667H31.3636V8.48772H33.0249C34.8499 8.48772 36.0204 7.4443 36.0204 5.83052C36.0204 4.21681 34.8499 3.17334 33.0249 3.17334H29.375V11.6667ZM31.3636 6.84972V4.81136H32.8236C33.5787 4.81136 34.0318 5.19958 34.0318 5.83052C34.0318 6.4615 33.5787 6.84972 32.8236 6.84972H31.3636ZM39.618 11.7637C41.5563 11.7637 42.9659 10.429 42.9659 8.60905C42.9659 6.78905 41.5563 5.45438 39.618 5.45438C37.6546 5.45438 36.2701 6.78905 36.2701 8.60905C36.2701 10.429 37.6546 11.7637 39.618 11.7637ZM38.1077 8.60905C38.1077 7.63838 38.7118 6.97105 39.618 6.97105C40.5116 6.97105 41.1157 7.63838 41.1157 8.60905C41.1157 9.57972 40.5116 10.2471 39.618 10.2471C38.7118 10.2471 38.1077 9.57972 38.1077 8.60905ZM46.1482 11.7637C47.6333 11.7637 48.6402 10.8658 48.6402 9.81025C48.6402 7.33505 45.2294 8.13585 45.2294 7.16518C45.2294 6.8983 45.5189 6.72843 45.9342 6.72843C46.3622 6.72843 46.8782 6.98318 47.0418 7.54132L48.527 6.94678C48.2375 6.06105 47.1677 5.45438 45.8713 5.45438C44.4743 5.45438 43.6058 6.25518 43.6058 7.21372C43.6058 9.53118 46.9663 8.88812 46.9663 9.84665C46.9663 10.1864 46.6391 10.417 46.1482 10.417C45.4434 10.417 44.9525 9.94376 44.8015 9.3735L43.3164 9.93158C43.6436 10.8537 44.6001 11.7637 46.1482 11.7637ZM53.4241 11.606L53.2982 10.0651C53.0843 10.1743 52.8074 10.2106 52.5808 10.2106C52.1278 10.2106 51.8257 9.89523 51.8257 9.34918V7.03172H53.3612V5.55145H51.8257V3.78001H49.9755V5.55145H48.9687V7.03172H49.9755V9.57972C49.9755 11.06 51.0202 11.7637 52.3921 11.7637C52.7696 11.7637 53.122 11.7031 53.4241 11.606ZM59.8749 3.17334V6.47358H56.376V3.17334H54.3874V11.6667H56.376V8.11158H59.8749V11.6667H61.8761V3.17334H59.8749ZM66.2899 11.7637C68.2281 11.7637 69.6378 10.429 69.6378 8.60905C69.6378 6.78905 68.2281 5.45438 66.2899 5.45438C64.3265 5.45438 62.942 6.78905 62.942 8.60905C62.942 10.429 64.3265 11.7637 66.2899 11.7637ZM64.7796 8.60905C64.7796 7.63838 65.3837 6.97105 66.2899 6.97105C67.1835 6.97105 67.7876 7.63838 67.7876 8.60905C67.7876 9.57972 67.1835 10.2471 66.2899 10.2471C65.3837 10.2471 64.7796 9.57972 64.7796 8.60905ZM73.2088 11.4725C73.901 11.4725 74.5177 11.242 74.845 10.8416V11.424C74.845 12.1034 74.2786 12.5767 73.4102 12.5767C72.7935 12.5767 72.2523 12.2854 72.1642 11.788L70.4776 12.0428C70.7042 13.1955 71.925 13.972 73.4102 13.972C75.361 13.972 76.6574 12.8679 76.6574 11.2298V5.55145H74.8324V6.07318C74.4926 5.69705 73.9136 5.45438 73.171 5.45438C71.409 5.45438 70.3014 6.61918 70.3014 8.46345C70.3014 10.3077 71.409 11.4725 73.2088 11.4725ZM72.1012 8.46345C72.1012 7.55345 72.655 6.97105 73.5109 6.97105C74.3793 6.97105 74.9331 7.55345 74.9331 8.46345C74.9331 9.37345 74.3793 9.95585 73.5109 9.95585C72.655 9.95585 72.1012 9.37345 72.1012 8.46345Z",
                    fill: "currentColor"
                })]
            })]
        }), ga("defs", {
            children: ga("clipPath", {
                id: "clip0_2415_6911",
                children: ga("rect", {
                    width: "76",
                    height: "14",
                    fill: "white",
                    transform: "translate(0.5)"
                })
            })
        })]
    }),
    Ca = ga("svg", {
        width: "16",
        height: "12",
        viewBox: "0 0 16 12",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: ga("path", {
            d: "M5.30769 10.6923L4.77736 11.2226C4.91801 11.3633 5.10878 11.4423 5.30769 11.4423C5.5066 11.4423 5.69737 11.3633 5.83802 11.2226L5.30769 10.6923ZM15.5303 1.53033C15.8232 1.23744 15.8232 0.762563 15.5303 0.46967C15.2374 0.176777 14.7626 0.176777 14.4697 0.46967L15.5303 1.53033ZM1.53033 5.85429C1.23744 5.56139 0.762563 5.56139 0.46967 5.85429C0.176777 6.14718 0.176777 6.62205 0.46967 6.91495L1.53033 5.85429ZM5.83802 11.2226L15.5303 1.53033L14.4697 0.46967L4.77736 10.162L5.83802 11.2226ZM0.46967 6.91495L4.77736 11.2226L5.83802 10.162L1.53033 5.85429L0.46967 6.91495Z",
            fill: "currentColor"
        })
    });

function Ia() {
    return ga("a", {
        href: "https://posthog.com",
        target: "_blank",
        rel: "noopener",
        className: "footer-branding",
        children: ["Survey by ", Sa]
    })
}

function ka(e) {
    var {
        text: t,
        submitDisabled: n,
        appearance: r,
        onSubmit: i,
        link: o,
        onPreviewSubmit: s
    } = e, {
        isPreviewMode: a,
        isPopup: l
    } = $s(ha), c = r.submitButtonTextColor || ta(r.submitButtonColor || na.submitButtonColor);
    return ga("div", {
        className: "bottom-section",
        children: [ga("div", {
            className: "buttons",
            children: ga("button", {
                className: "form-submit",
                disabled: n && !a,
                type: "button",
                style: l ? {
                    color: c
                } : {},
                onClick: () => {
                    a ? null == s || s() : (o && (null == Vn || Vn.open(o)), i())
                },
                children: t
            })
        }), !r.whiteLabel && ga(Ia, {})]
    })
}

function Ea(e) {
    var {
        question: t,
        description: n,
        descriptionContentType: r,
        backgroundColor: i,
        forceDisableHtml: o
    } = e, {
        isPopup: s
    } = $s(ha);
    return ga("div", {
        style: s ? {
            backgroundColor: i || na.backgroundColor
        } : {},
        children: [ga("div", {
            className: "survey-question",
            children: t
        }), n && pa({
            component: ns("div", {
                className: "survey-question-description"
            }),
            children: n,
            renderAsHtml: !o && "text" !== r
        })]
    })
}

function xa(e) {
    var {
        onClick: t
    } = e, {
        isPreviewMode: n
    } = $s(ha);
    return ga("div", {
        className: "cancel-btn-wrapper",
        onClick: t,
        disabled: n,
        children: ga("button", {
            className: "form-cancel",
            onClick: t,
            disabled: n,
            children: wa
        })
    })
}

function Ta(e) {
    var {
        header: n,
        description: r,
        contentType: i,
        forceDisableHtml: o,
        appearance: s,
        onClose: a,
        styleOverrides: l
    } = e, c = ta(s.backgroundColor || na.backgroundColor), {
        isPopup: u
    } = $s(ha);
    return ga(is, {
        children: ga("div", {
            className: "thank-you-message",
            style: t({}, l),
            children: ga("div", {
                className: "thank-you-message-container",
                children: [u && ga(xa, {
                    onClick: () => a()
                }), ga("h3", {
                    className: "thank-you-message-header",
                    style: {
                        color: c
                    },
                    children: n
                }), r && pa({
                    component: ns("div", {
                        className: "thank-you-message-body"
                    }),
                    children: r,
                    renderAsHtml: !o && "text" !== i,
                    style: {
                        color: c
                    }
                }), u && ga(ka, {
                    text: s.thankYouMessageCloseButtonText || "Close",
                    submitDisabled: !1,
                    appearance: s,
                    onSubmit: () => a()
                })]
            })
        })
    })
}

function Ma(e) {
    var t, n = qs(null),
        [r, i] = Ds(null !== (t = e.defaultTextColor) && void 0 !== t ? t : "black");
    return Bs((() => {
        if (n.current) {
            var e = function(e) {
                var t = Xs.getComputedStyle(e).backgroundColor;
                if ("rgba(0, 0, 0, 0)" === t) return "black";
                var n = t.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
                if (!n) return "black";
                var r = parseInt(n[1]),
                    i = parseInt(n[2]),
                    o = parseInt(n[3]);
                return Math.sqrt(r * r * .299 + i * i * .587 + o * o * .114) > 127.5 ? "black" : "white"
            }(n.current);
            i(e)
        }
    }), [e.appearance, e.forceUpdate]), {
        ref: n,
        textColor: r
    }
}

function Ra(e) {
    var {
        question: t,
        forceDisableHtml: n,
        appearance: r,
        onSubmit: i,
        onPreviewSubmit: o
    } = e, s = qs(null), [a, l] = Ds("");
    return ga("div", {
        ref: s,
        children: [ga(Ea, {
            question: t.question,
            description: t.description,
            descriptionContentType: t.descriptionContentType,
            backgroundColor: r.backgroundColor,
            forceDisableHtml: n
        }), ga("textarea", {
            rows: 4,
            placeholder: null == r ? void 0 : r.placeholder,
            onInput: e => l(e.currentTarget.value)
        }), ga(ka, {
            text: t.buttonText || "Submit",
            submitDisabled: !a && !t.optional,
            appearance: r,
            onSubmit: () => i(a),
            onPreviewSubmit: () => o(a)
        })]
    })
}

function Aa(e) {
    var {
        question: t,
        forceDisableHtml: n,
        appearance: r,
        onSubmit: i,
        onPreviewSubmit: o
    } = e;
    return ga(is, {
        children: [ga(Ea, {
            question: t.question,
            description: t.description,
            descriptionContentType: t.descriptionContentType,
            forceDisableHtml: n
        }), ga(ka, {
            text: t.buttonText || "Submit",
            submitDisabled: !1,
            link: t.link,
            appearance: r,
            onSubmit: () => i("link clicked"),
            onPreviewSubmit: () => o("link clicked")
        })]
    })
}

function Na(e) {
    var {
        question: t,
        forceDisableHtml: n,
        displayQuestionIndex: r,
        appearance: i,
        onSubmit: o,
        onPreviewSubmit: s
    } = e, a = t.scale, l = 10 === t.scale ? 0 : 1, [c, u] = Ds(null);
    return ga(is, {
        children: [ga(Ea, {
            question: t.question,
            description: t.description,
            descriptionContentType: t.descriptionContentType,
            forceDisableHtml: n,
            backgroundColor: i.backgroundColor
        }), ga("div", {
            className: "rating-section",
            children: [ga("div", {
                className: "rating-options",
                children: ["emoji" === t.display && ga("div", {
                    className: "rating-options-emoji",
                    children: (3 === t.scale ? Pa : La).map(((e, t) => {
                        var n = t + 1 === c;
                        return ga("button", {
                            className: "ratings-emoji question-".concat(r, "-rating-").concat(t, " ").concat(n ? "rating-active" : null),
                            value: t + 1,
                            type: "button",
                            onClick: () => {
                                u(t + 1)
                            },
                            style: {
                                fill: n ? i.ratingButtonActiveColor : i.ratingButtonColor,
                                borderColor: i.borderColor
                            },
                            children: e
                        }, t)
                    }))
                }), "number" === t.display && ga("div", {
                    className: "rating-options-number",
                    style: {
                        gridTemplateColumns: "repeat(".concat(a - l + 1, ", minmax(0, 1fr))")
                    },
                    children: Ha(t.scale).map(((e, t) => ga(Fa, {
                        displayQuestionIndex: r,
                        active: c === e,
                        appearance: i,
                        num: e,
                        setActiveNumber: e => {
                            u(e)
                        }
                    }, t)))
                })]
            }), ga("div", {
                className: "rating-text",
                children: [ga("div", {
                    children: t.lowerBoundLabel
                }), ga("div", {
                    children: t.upperBoundLabel
                })]
            })]
        }), ga(ka, {
            text: t.buttonText || (null == i ? void 0 : i.submitButtonText) || "Submit",
            submitDisabled: wr(c) && !t.optional,
            appearance: i,
            onSubmit: () => o(c),
            onPreviewSubmit: () => s(c)
        })]
    })
}

function Fa(e) {
    var {
        num: t,
        active: n,
        displayQuestionIndex: r,
        appearance: i,
        setActiveNumber: o
    } = e, {
        textColor: s,
        ref: a
    } = Ma({
        appearance: i,
        defaultTextColor: "black",
        forceUpdate: n
    });
    return ga("button", {
        ref: a,
        className: "ratings-number question-".concat(r, "-rating-").concat(t, " ").concat(n ? "rating-active" : null),
        type: "button",
        onClick: () => {
            o(t)
        },
        style: {
            color: s,
            backgroundColor: n ? i.ratingButtonActiveColor : i.ratingButtonColor,
            borderColor: i.borderColor
        },
        children: t
    })
}

function Oa(e) {
    var {
        question: t,
        forceDisableHtml: n,
        displayQuestionIndex: r,
        appearance: i,
        onSubmit: o,
        onPreviewSubmit: s
    } = e, a = qs(null), l = Hs((() => (e => {
        if (!e.shuffleOptions) return e.choices;
        var t = e.choices,
            n = "";
        e.hasOpenChoice && (n = t.pop());
        var r = aa(t, sa(t));
        return e.hasOpenChoice && (e.choices.push(n), r.push(n)), r
    })(t)), [t]), [c, u] = Ds(t.type === qo.MultipleChoice ? [] : null), [d, h] = Ds(!1), [p, v] = Ds(""), g = t.type === qo.SingleChoice ? "radio" : "checkbox";
    return ga("div", {
        ref: a,
        children: [ga(Ea, {
            question: t.question,
            description: t.description,
            descriptionContentType: t.descriptionContentType,
            forceDisableHtml: n,
            backgroundColor: i.backgroundColor
        }), ga("div", {
            className: "multiple-choice-options",
            children: l.map(((e, n) => {
                var i = "choice-option",
                    o = e,
                    s = e;
                return t.hasOpenChoice && n === t.choices.length - 1 && (i += " choice-option-open"), ga("div", {
                    className: i,
                    children: [ga("input", {
                        type: g,
                        id: "surveyQuestion".concat(r, "Choice").concat(n),
                        name: "question".concat(r),
                        value: o,
                        disabled: !o,
                        onInput: () => t.hasOpenChoice && n === t.choices.length - 1 ? h(!d) : t.type === qo.SingleChoice ? u(o) : t.type === qo.MultipleChoice && hr(c) ? c.includes(o) ? u(c.filter((e => e !== o))) : u([...c, o]) : void 0
                    }), ga("label", {
                        htmlFor: "surveyQuestion".concat(r, "Choice").concat(n),
                        style: {
                            color: "black"
                        },
                        children: t.hasOpenChoice && n === t.choices.length - 1 ? ga(is, {
                            children: [ga("span", {
                                children: [s, ":"]
                            }), ga("input", {
                                type: "text",
                                id: "surveyQuestion".concat(r, "Choice").concat(n, "Open"),
                                name: "question".concat(r),
                                onInput: e => {
                                    var n = e.currentTarget.value;
                                    return t.type === qo.SingleChoice ? u(n) : t.type === qo.MultipleChoice && hr(c) ? v(n) : void 0
                                }
                            })]
                        }) : s
                    }), ga("span", {
                        className: "choice-check",
                        style: {
                            color: "black"
                        },
                        children: Ca
                    })]
                })
            }))
        }), ga(ka, {
            text: t.buttonText || "Submit",
            submitDisabled: (wr(c) || hr(c) && !d && 0 === c.length || hr(c) && d && !p && 0 === c.length && !t.optional) && !t.optional,
            appearance: i,
            onSubmit: () => {
                d && t.type === qo.MultipleChoice ? hr(c) && o([...c, p]) : o(c)
            },
            onPreviewSubmit: () => {
                d && t.type === qo.MultipleChoice ? hr(c) && s([...c, p]) : s(c)
            }
        })]
    })
}
var Pa = [_a, ma, fa],
    La = [ya, _a, ma, fa, ba],
    Da = [1, 2, 3, 4, 5],
    Ba = [1, 2, 3, 4, 5, 6, 7],
    qa = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Ha(e) {
    switch (e) {
        case 5:
        default:
            return Da;
        case 7:
            return Ba;
        case 10:
            return qa
    }
}
var $a = Ar("[Surveys]"),
    Wa = Vn,
    Va = Yn;
class Za {
    constructor(e) {
        var t = this;
        i(this, "canShowNextEventBasedSurvey", (() => {
            var e, t = Va.querySelectorAll("div[class^=PostHogSurvey]");
            return !(t.length > 0) || 1 === (null === (e = t[t.length - 1].shadowRoot) || void 0 === e ? void 0 : e.childElementCount)
        })), i(this, "handlePopoverSurvey", (e => {
            var t, n = null === (t = e.conditions) || void 0 === t ? void 0 : t.seenSurveyWaitPeriodInDays,
                r = localStorage.getItem("lastSeenSurveyDate");
            if (n && r) {
                var i = new Date,
                    o = Math.abs(i.getTime() - new Date(r).getTime());
                if (Math.ceil(o / 864e5) < n) return
            }
            var s = (e => !!localStorage.getItem(ua(e)) && !ca(e))(e);
            if (!s) {
                this.addSurveyToFocus(e.id);
                var a = ((e, t, n) => {
                    var r = Js.createElement("div");
                    r.className = "PostHogSurvey".concat(t);
                    var i = r.attachShadow({
                        mode: "open"
                    });
                    if (e) {
                        var o = Object.assign(Js.createElement("style"), {
                            innerText: e
                        });
                        i.appendChild(o)
                    }
                    return Js.body.appendChild(r), i
                })(Qs(null == e ? void 0 : e.appearance), e.id);
                Ss(ga(Ua, {
                    posthog: this.posthog,
                    survey: e,
                    removeSurveyFromFocus: this.removeSurveyFromFocus,
                    isPopup: !0
                }, "popover-survey"), a)
            }
        })), i(this, "handleWidget", (e => {
            var t = function(e) {
                    var t, n = Ys.createElement("div");
                    n.className = "PostHogWidget".concat(e.id);
                    var r, i = n.attachShadow({
                            mode: "open"
                        }),
                        o = (r = null === (t = e.appearance) || void 0 === t ? void 0 : t.widgetColor, "\n        .ph-survey-widget-tab {\n            position: fixed;\n            top: 50%;\n            right: 0;\n            background: ".concat(r || "#e0a045", ";\n            color: white;\n            transform: rotate(-90deg) translate(0, -100%);\n            transform-origin: right top;\n            min-width: 40px;\n            padding: 8px 12px;\n            font-weight: 500;\n            border-radius: 3px 3px 0 0;\n            text-align: center;\n            cursor: pointer;\n            z-index: 9999999;\n        }\n        .ph-survey-widget-tab:hover {\n            padding-bottom: 13px;\n        }\n        .ph-survey-widget-button {\n            position: fixed;\n        }\n    "));
                    return i.append(Object.assign(Ys.createElement("style"), {
                        innerText: o
                    })), Ys.body.appendChild(n), i
                }(e),
                n = Qs(e.appearance);
            t.appendChild(Object.assign(Va.createElement("style"), {
                innerText: n
            })), Ss(ga(za, {
                posthog: this.posthog,
                survey: e,
                removeSurveyFromFocus: this.removeSurveyFromFocus
            }, "feedback-survey"), t)
        })), i(this, "handleWidgetSelector", (e => {
            var t, n = (null === (t = e.appearance) || void 0 === t ? void 0 : t.widgetSelector) && Va.querySelector(e.appearance.widgetSelector);
            if (n)
                if (0 === Va.querySelectorAll(".PostHogWidget".concat(e.id)).length) this.handleWidget(e);
                else if (1 === Va.querySelectorAll(".PostHogWidget".concat(e.id)).length && !n.getAttribute("PHWidgetSurveyClickListener")) {
                var r, i, o = null === (r = Va.querySelector(".PostHogWidget".concat(e.id))) || void 0 === r || null === (i = r.shadowRoot) || void 0 === i ? void 0 : i.querySelector(".survey-form");
                n.addEventListener("click", (() => {
                    o && (o.style.display = "none" === o.style.display ? "block" : "none", o.addEventListener("PHSurveyClosed", (() => {
                        this.removeSurveyFromFocus(e.id), o.style.display = "none"
                    })))
                })), n.setAttribute("PHWidgetSurveyClickListener", "true")
            }
        })), i(this, "canRenderSurvey", (e => {
            var t = {
                visible: !1
            };
            return e.end_date ? (t.disabledReason = "survey was completed on ".concat(e.end_date), t) : e.type != Bo.Popover ? (t.disabledReason = "Only Popover survey types can be rendered", t) : !e.linked_flag_key || this.posthog.featureFlags.isFeatureEnabled(e.linked_flag_key) ? !e.targeting_flag_key || this.posthog.featureFlags.isFeatureEnabled(e.targeting_flag_key) ? !e.internal_targeting_flag_key || this.posthog.featureFlags.isFeatureEnabled(e.internal_targeting_flag_key) ? (t.visible = !0, t) : (t.disabledReason = "internal targeting feature flag ".concat(e.internal_targeting_flag_key, " is false"), t) : (t.disabledReason = "targeting feature flag ".concat(e.targeting_flag_key, " is false"), t) : (t.disabledReason = "linked feature flag ".concat(e.linked_flag_key, " is false"), t)
        })), i(this, "renderSurvey", ((e, t) => {
            Ss(ga(Ua, {
                posthog: this.posthog,
                survey: e,
                removeSurveyFromFocus: this.removeSurveyFromFocus,
                isPopup: !1
            }, "popover-survey"), t)
        })), i(this, "callSurveysAndEvaluateDisplayLogic", (function() {
            var e, n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            null === (e = t.posthog) || void 0 === e || e.getActiveMatchingSurveys((e => {
                var n = e.filter((e => "api" !== e.type));
                t.sortSurveysByAppearanceDelay(n).forEach((e => {
                    if (wr(t.surveyInFocus)) {
                        var n, r, i;
                        if (e.type === Bo.Widget) "tab" === (null === (n = e.appearance) || void 0 === n ? void 0 : n.widgetType) && 0 === Va.querySelectorAll(".PostHogWidget".concat(e.id)).length && t.handleWidget(e), "selector" === (null === (r = e.appearance) || void 0 === r ? void 0 : r.widgetType) && null !== (i = e.appearance) && void 0 !== i && i.widgetSelector && t.handleWidgetSelector(e);
                        e.type === Bo.Popover && t.canShowNextEventBasedSurvey() && t.handlePopoverSurvey(e)
                    }
                }))
            }), n)
        })), i(this, "addSurveyToFocus", (e => {
            wr(this.surveyInFocus) || $a.error("Survey ".concat([...this.surveyInFocus], " already in focus. Cannot add survey ").concat(e, ".")), this.surveyInFocus = e
        })), i(this, "removeSurveyFromFocus", (e => {
            this.surveyInFocus !== e && $a.error("Survey ".concat(e, " is not in focus. Cannot remove survey ").concat(e, ".")), this.surveyInFocus = null
        })), this.posthog = e, this.surveyInFocus = null
    }
    sortSurveysByAppearanceDelay(e) {
        return e.sort(((e, t) => {
            var n, r;
            return ((null === (n = e.appearance) || void 0 === n ? void 0 : n.surveyPopupDelaySeconds) || 0) - ((null === (r = t.appearance) || void 0 === r ? void 0 : r.surveyPopupDelaySeconds) || 0)
        }))
    }
    getTestAPI() {
        return {
            addSurveyToFocus: this.addSurveyToFocus,
            removeSurveyFromFocus: this.removeSurveyFromFocus,
            surveyInFocus: this.surveyInFocus,
            canShowNextEventBasedSurvey: this.canShowNextEventBasedSurvey,
            handleWidget: this.handleWidget,
            handlePopoverSurvey: this.handlePopoverSurvey,
            handleWidgetSelector: this.handleWidgetSelector,
            sortSurveysByAppearanceDelay: this.sortSurveysByAppearanceDelay
        }
    }
}

function Ga(e) {
    if (Va && Wa) {
        var t = new Za(e);
        return t.callSurveysAndEvaluateDisplayLogic(!0), setInterval((() => {
            t.callSurveysAndEvaluateDisplayLogic(!1)
        }), 1e3), t
    }
}

function Ua(e) {
    var n, r, i, o, s, a, {
            survey: l,
            forceDisableHtml: c,
            posthog: u,
            style: d,
            previewPageIndex: h,
            removeSurveyFromFocus: p,
            isPopup: v,
            onPreviewSubmit: g = (() => {})
        } = e,
        f = Number.isInteger(h),
        m = null !== (n = l.appearance) && void 0 !== n && n.surveyPopupDelaySeconds ? 1e3 * l.appearance.surveyPopupDelaySeconds : 0,
        {
            isPopupVisible: _,
            isSurveySent: y,
            setIsPopupVisible: b
        } = function(e, t, n, r, i) {
            var [o, s] = Ds(r || 0 === n), [a, l] = Ds(!1);
            return Bs((() => {
                if (!r && t) {
                    var o, a = () => {
                            i(e.id), s(!1)
                        },
                        c = () => {
                            var t, n;
                            null !== (t = e.appearance) && void 0 !== t && t.displayThankYouMessage ? (l(!0), i(e.id), null !== (n = e.appearance) && void 0 !== n && n.autoDisappear && setTimeout((() => {
                                s(!1)
                            }), 5e3)) : (i(e.id), s(!1))
                        },
                        u = () => {
                            var n;
                            s(!0), Wa.dispatchEvent(new Event("PHSurveyShown")), t.capture("survey shown", {
                                $survey_name: e.name,
                                $survey_id: e.id,
                                $survey_iteration: e.current_iteration,
                                $survey_iteration_start_date: e.current_iteration_start_date,
                                sessionRecordingUrl: null === (n = t.get_session_replay_url) || void 0 === n ? void 0 : n.call(t)
                            }), localStorage.setItem("lastSeenSurveyDate", (new Date).toISOString())
                        };
                    return Wa.addEventListener("PHSurveyClosed", a), Wa.addEventListener("PHSurveySent", c), n > 0 ? (o = setTimeout((() => {
                        u()
                    }), n), () => {
                        clearTimeout(o), Wa.removeEventListener("PHSurveyClosed", a), Wa.removeEventListener("PHSurveySent", c)
                    }) : (u(), () => {
                        Wa.removeEventListener("PHSurveyClosed", a), Wa.removeEventListener("PHSurveySent", c)
                    })
                }
            }), []), {
                isPopupVisible: o,
                isSurveySent: a,
                setIsPopupVisible: s
            }
        }(l, u, m, f, p),
        w = y || h === l.questions.length,
        S = null !== (r = d) && void 0 !== r && r.left && Cr(null === (i = d) || void 0 === i ? void 0 : i.left) ? {
            left: d.left - 40
        } : {};
    return f && ((d = d || {}).left = "unset", d.right = "unset", d.transform = "unset"), _ ? ga(ha.Provider, {
        value: {
            isPreviewMode: f,
            previewPageIndex: h,
            handleCloseSurveyPopup: () => oa(l, u, f),
            isPopup: v || !1,
            onPreviewSubmit: g
        },
        children: w ? ga(Ta, {
            header: (null === (o = l.appearance) || void 0 === o ? void 0 : o.thankYouMessageHeader) || "Thank you!",
            description: (null === (s = l.appearance) || void 0 === s ? void 0 : s.thankYouMessageDescription) || "",
            forceDisableHtml: !!c,
            contentType: null === (a = l.appearance) || void 0 === a ? void 0 : a.thankYouMessageDescriptionContentType,
            appearance: l.appearance || na,
            styleOverrides: t(t({}, d), S),
            onClose: () => b(!1)
        }) : ga(ja, {
            survey: l,
            forceDisableHtml: !!c,
            posthog: u,
            styleOverrides: d
        })
    }) : ga(is, {})
}

function ja(e) {
    var n, r, {
            survey: i,
            forceDisableHtml: o,
            posthog: s,
            styleOverrides: a
        } = e,
        l = ta((null === (n = i.appearance) || void 0 === n ? void 0 : n.backgroundColor) || na.backgroundColor),
        [c, u] = Ds({}),
        {
            isPreviewMode: d,
            previewPageIndex: h,
            handleCloseSurveyPopup: p,
            isPopup: v,
            onPreviewSubmit: g
        } = $s(ha),
        [f, m] = Ds(h || 0),
        _ = Hs((() => la(i)), [i]);
    Bs((() => {
        m(null != h ? h : 0)
    }), [h]);
    return ga("form", {
        className: "survey-form",
        style: v ? t({
            color: l,
            borderColor: null === (r = i.appearance) || void 0 === r ? void 0 : r.borderColor
        }, a) : {},
        children: _.map(((e, n) => {
            var r, {
                originalQuestionIndex: a
            } = e;
            return (d ? f === a : f === n) && ga("div", {
                className: "survey-box",
                style: v ? {
                    backgroundColor: (null === (r = i.appearance) || void 0 === r ? void 0 : r.backgroundColor) || na.backgroundColor
                } : {},
                children: [v && ga(xa, {
                    onClick: () => p()
                }), Ya({
                    question: e,
                    forceDisableHtml: o,
                    displayQuestionIndex: n,
                    appearance: i.appearance || na,
                    onSubmit: e => (e => {
                        var {
                            res: n,
                            originalQuestionIndex: r,
                            displayQuestionIndex: o
                        } = e;
                        if (s) {
                            var a = 0 === r ? "$survey_response" : "$survey_response_".concat(r);
                            if (u(t(t({}, c), {}, {
                                    [a]: n
                                })), s.getNextSurveyStep) {
                                var l = s.getNextSurveyStep(i, o, n);
                                l === Ho.End ? ia(t(t({}, c), {}, {
                                    [a]: n
                                }), i, s) : m(l)
                            } else o === i.questions.length - 1 ? ia(t(t({}, c), {}, {
                                [a]: n
                            }), i, s) : m(o + 1)
                        }
                    })({
                        res: e,
                        originalQuestionIndex: a,
                        displayQuestionIndex: n
                    }),
                    onPreviewSubmit: g
                })]
            })
        }))
    })
}

function za(e) {
    var t, n, {
            survey: r,
            forceDisableHtml: i,
            posthog: o,
            readOnly: s,
            removeSurveyFromFocus: a
        } = e,
        [l, c] = Ds(!1),
        [u, d] = Ds({}),
        h = qs(null);
    return Bs((() => {
        var e, t;
        if (!s && o) {
            if ("tab" === (null === (e = r.appearance) || void 0 === e ? void 0 : e.widgetType) && h.current) {
                var n, i = h.current.getBoundingClientRect(),
                    a = {
                        top: "50%",
                        left: parseInt("".concat(i.right - 360)),
                        bottom: "auto",
                        borderRadius: 10,
                        borderBottom: "1.5px solid ".concat((null === (n = r.appearance) || void 0 === n ? void 0 : n.borderColor) || "#c9c6c6")
                    };
                d(a)
            }
            if ("selector" === (null === (t = r.appearance) || void 0 === t ? void 0 : t.widgetType)) {
                var u = Va.querySelector(r.appearance.widgetSelector || "");
                null == u || u.addEventListener("click", (() => {
                    c(!l)
                })), null == u || u.setAttribute("PHWidgetSurveyClickListener", "true")
            }
        }
    }), []), ga(is, {
        children: ["tab" === (null === (t = r.appearance) || void 0 === t ? void 0 : t.widgetType) && ga("div", {
            className: "ph-survey-widget-tab",
            ref: h,
            onClick: () => !s && c(!l),
            style: {
                color: ta(r.appearance.widgetColor)
            },
            children: [ga("div", {
                className: "ph-survey-widget-tab-icon"
            }), (null === (n = r.appearance) || void 0 === n ? void 0 : n.widgetLabel) || ""]
        }), l && ga(Ua, {
            posthog: o,
            survey: r,
            forceDisableHtml: i,
            style: u,
            removeSurveyFromFocus: a,
            isPopup: !0
        }, "feedback-widget-survey")]
    })
}
var Ya = e => {
    var {
        question: n,
        forceDisableHtml: r,
        displayQuestionIndex: i,
        appearance: o,
        onSubmit: s,
        onPreviewSubmit: a
    } = e, l = {
        [qo.Open]: Ra,
        [qo.Link]: Aa,
        [qo.Rating]: Na,
        [qo.SingleChoice]: Oa,
        [qo.MultipleChoice]: Oa
    }, c = {
        question: n,
        forceDisableHtml: r,
        appearance: o,
        onPreviewSubmit: e => {
            a(e)
        },
        onSubmit: e => {
            s(e)
        }
    }, u = {
        [qo.Open]: {},
        [qo.Link]: {},
        [qo.Rating]: {
            displayQuestionIndex: i
        },
        [qo.SingleChoice]: {
            displayQuestionIndex: i
        },
        [qo.MultipleChoice]: {
            displayQuestionIndex: i
        }
    }, d = l[n.type], h = t(t({}, c), u[n.type]);
    return ga(d, t({}, h))
};

function Xa(e) {
    return !_r(Event) && Ja(e, Event)
}

function Ja(e, t) {
    try {
        return e instanceof t
    } catch (e) {
        return !1
    }
}

function Ka(e) {
    return wr(e) || !fr(e) && !pr(e)
}

function Qa(e, t) {
    return Object.prototype.toString.call(e) === "[object ".concat(t, "]")
}

function el(e) {
    return Qa(e, "DOMError")
}
tr.__PosthogExtensions__ = tr.__PosthogExtensions__ || {}, tr.__PosthogExtensions__.canActivateRepeatedly = ca, tr.__PosthogExtensions__.generateSurveys = Ga, tr.extendPostHogWithSurveys = Ga;
var tl = /\(error: (.*)\)/,
    nl = 50,
    rl = "?";

function il(e, t, n, r) {
    var i = {
        platform: "web:javascript",
        filename: e,
        function: "<anonymous>" === t ? rl : t,
        in_app: !0
    };
    return _r(n) || (i.lineno = n), _r(r) || (i.colno = r), i
}
var ol = /^\s*at (\S+?)(?::(\d+))(?::(\d+))\s*$/i,
    sl = /^\s*at (?:(.+?\)(?: \[.+\])?|.*?) ?\((?:address at )?)?(?:async )?((?:<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
    al = /\((\S*)(?::(\d+))(?::(\d+))\)/,
    ll = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:[-a-z]+)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
    cl = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
    ul = function() {
        for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
        var i = n.sort(((e, t) => e[0] - t[0])).map((e => e[1]));
        return function(e) {
            for (var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r = [], o = e.split("\n"), s = n; s < o.length; s++) {
                var a = o[s];
                if (!(a.length > 1024)) {
                    var l = tl.test(a) ? a.replace(tl, "$1") : a;
                    if (!l.match(/\S*Error: /)) {
                        for (var c of i) {
                            var u = c(l);
                            if (u) {
                                r.push(u);
                                break
                            }
                        }
                        if (r.length >= nl) break
                    }
                }
            }
            return function(e) {
                if (!e.length) return [];
                var n = Array.from(e);
                return n.reverse(), n.slice(0, nl).map((e => t(t({}, e), {}, {
                    filename: e.filename || dl(n).filename,
                    function: e.function || rl
                })))
            }(r)
        }
    }(...[
        [30, e => {
            var t = ol.exec(e);
            if (t) {
                var [, n, r, i] = t;
                return il(n, rl, +r, +i)
            }
            var o = sl.exec(e);
            if (o) {
                if (o[2] && 0 === o[2].indexOf("eval")) {
                    var s = al.exec(o[2]);
                    s && (o[2] = s[1], o[3] = s[2], o[4] = s[3])
                }
                var [a, l] = hl(o[1] || rl, o[2]);
                return il(l, a, o[3] ? +o[3] : void 0, o[4] ? +o[4] : void 0)
            }
        }],
        [50, e => {
            var t = ll.exec(e);
            if (t) {
                if (t[3] && t[3].indexOf(" > eval") > -1) {
                    var n = cl.exec(t[3]);
                    n && (t[1] = t[1] || "eval", t[3] = n[1], t[4] = n[2], t[5] = "")
                }
                var r = t[3],
                    i = t[1] || rl;
                return [i, r] = hl(i, r), il(r, i, t[4] ? +t[4] : void 0, t[5] ? +t[5] : void 0)
            }
        }]
    ]);

function dl(e) {
    return e[e.length - 1] || {}
}
var hl = (e, t) => {
        var n = -1 !== e.indexOf("safari-extension"),
            r = -1 !== e.indexOf("safari-web-extension");
        return n || r ? [-1 !== e.indexOf("@") ? e.split("@")[0] : rl, n ? "safari-extension:".concat(t) : "safari-web-extension:".concat(t)] : [e, t]
    },
    pl = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;

function vl(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
        n = e.stacktrace || e.stack || "",
        r = function(e) {
            if (e && gl.test(e.message)) return 1;
            return 0
        }(e);
    try {
        var i = ul(n, r);
        return i.slice(0, i.length - t)
    } catch (e) {}
    return []
}
var gl = /Minified React error #\d+;/i;

function fl(e, t) {
    var n, r, i = vl(e),
        o = null === (n = null == t ? void 0 : t.handled) || void 0 === n || n,
        s = null !== (r = null == t ? void 0 : t.synthetic) && void 0 !== r && r;
    return {
        $exception_list: [{
            type: null != t && t.overrideExceptionType ? t.overrideExceptionType : e.name,
            value: null != t && t.overrideExceptionMessage ? t.overrideExceptionMessage : function(e) {
                var t = e.message;
                if (t.error && "string" == typeof t.error.message) return t.error.message;
                return t
            }(e),
            stacktrace: {
                frames: i,
                type: "raw"
            },
            mechanism: {
                handled: o,
                synthetic: s
            }
        }],
        $exception_level: "error"
    }
}

function ml(e, t) {
    var n, r, i, o = null === (n = null == t ? void 0 : t.handled) || void 0 === n || n,
        s = null === (r = null == t ? void 0 : t.synthetic) || void 0 === r || r,
        a = {
            type: null != t && t.overrideExceptionType ? t.overrideExceptionType : null !== (i = null == t ? void 0 : t.defaultExceptionType) && void 0 !== i ? i : "Error",
            value: null != t && t.overrideExceptionMessage ? t.overrideExceptionMessage : e || (null == t ? void 0 : t.defaultExceptionMessage),
            mechanism: {
                handled: o,
                synthetic: s
            }
        };
    if (null != t && t.syntheticException) {
        var l = vl(t.syntheticException, 1);
        l.length && (a.stacktrace = {
            frames: l,
            type: "raw"
        })
    }
    return {
        $exception_list: [a],
        $exception_level: "error"
    }
}

function _l(e) {
    return yr(e) && !br(e) && ir.indexOf(e) >= 0
}

function yl(e, t) {
    var n, r, i = null === (n = null == t ? void 0 : t.handled) || void 0 === n || n,
        o = null === (r = null == t ? void 0 : t.synthetic) || void 0 === r || r,
        s = null != t && t.overrideExceptionType ? t.overrideExceptionType : Xa(e) ? e.constructor.name : "Error",
        a = null != t && t.overrideExceptionMessage ? t.overrideExceptionMessage : "Non-Error ".concat("exception", " captured with keys: ", function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 40,
                n = Object.keys(e);
            if (n.sort(), !n.length) return "[object has no keys]";
            for (var r = n.length; r > 0; r--) {
                var i = n.slice(0, r).join(", ");
                if (!(i.length > t)) return r === n.length || i.length <= t ? i : "".concat(i.slice(0, t), "...")
            }
            return ""
        }(e)),
        l = {
            type: s,
            value: a,
            mechanism: {
                handled: i,
                synthetic: o
            }
        };
    if (null != t && t.syntheticException) {
        var c = vl(null == t ? void 0 : t.syntheticException, 1);
        c.length && (l.stacktrace = {
            frames: c,
            type: "raw"
        })
    }
    return {
        $exception_list: [l],
        $exception_level: _l(e.level) ? e.level : "error"
    }
}

function bl(e, n) {
    var [r, i, o, s, a] = e, l = {
        $exception_list: []
    }, c = a || r;
    if (el(c) || function(e) {
            return Qa(e, "DOMException")
        }(c)) {
        var u = c;
        if (function(e) {
                return "stack" in e
            }(c)) l = fl(c, n);
        else {
            var d = u.name || (el(u) ? "DOMError" : "DOMException"),
                h = u.message ? "".concat(d, ": ").concat(u.message) : d,
                p = el(u) ? "DOMError" : "DOMException";
            l = ml(h, t(t({}, n), {}, {
                overrideExceptionType: p,
                defaultExceptionMessage: h
            }))
        }
        return "code" in u && (l.$exception_DOMException_code = "".concat(u.code)), l
    }
    if (function(e) {
            return Qa(e, "ErrorEvent")
        }(c) && c.error) return fl(c.error, n);
    if (function(e) {
            switch (Object.prototype.toString.call(e)) {
                case "[object Error]":
                case "[object Exception]":
                case "[object DOMException]":
                case "[object DOMError]":
                    return !0;
                default:
                    return Ja(e, Error)
            }
        }(c)) return fl(c, n);
    if (function(e) {
            return Qa(e, "Object")
        }(c) || Xa(c)) return yl(c, n);
    if (_r(a) && yr(r)) {
        var v = "Error",
            g = r,
            f = r.match(pl);
        return f && (v = f[1], g = f[2]), ml(g, t(t({}, n), {}, {
            overrideExceptionType: v,
            defaultExceptionMessage: g
        }))
    }
    return ml(c, n)
}

function wl(e) {
    var [t] = e, n = function(e) {
        if (Ka(e)) return e;
        try {
            if ("reason" in e) return e.reason;
            if ("detail" in e && "reason" in e.detail) return e.detail.reason
        } catch (e) {}
        return e
    }(t);
    return Ka(n) ? ml("Non-Error promise rejection captured with value: ".concat(String(n)), {
        handled: !1,
        synthetic: !1,
        overrideExceptionType: "UnhandledRejection"
    }) : bl([n], {
        handled: !1,
        overrideExceptionType: "UnhandledRejection",
        defaultExceptionMessage: String(n)
    })
}
var Sl = Ar("[ExceptionAutocapture]"),
    Cl = {
        wrapOnError: e => {
            var t = Vn;
            t || Sl.info("window not available, cannot wrap onerror");
            var n = t.onerror;
            return t.onerror = function() {
                for (var t, r = arguments.length, i = new Array(r), o = 0; o < r; o++) i[o] = arguments[o];
                var s = bl(i);
                return e(s), null !== (t = null == n ? void 0 : n(...i)) && void 0 !== t && t
            }, t.onerror.__POSTHOG_INSTRUMENTED__ = !0, () => {
                var e;
                null === (e = t.onerror) || void 0 === e || delete e.__POSTHOG_INSTRUMENTED__, t.onerror = n
            }
        },
        wrapUnhandledRejection: e => {
            var t = Vn;
            t || Sl.info("window not available, cannot wrap onUnhandledRejection");
            var n = t.onunhandledrejection;
            return t.onunhandledrejection = function() {
                for (var r, i = arguments.length, o = new Array(i), s = 0; s < i; s++) o[s] = arguments[s];
                var a = wl(o);
                return e(a), null !== (r = null == n ? void 0 : n.apply(t, o)) && void 0 !== r && r
            }, t.onunhandledrejection.__POSTHOG_INSTRUMENTED__ = !0, () => {
                var e;
                null === (e = t.onunhandledrejection) || void 0 === e || delete e.__POSTHOG_INSTRUMENTED__, t.onunhandledrejection = n
            }
        }
    };
tr.__PosthogExtensions__ = tr.__PosthogExtensions__ || {}, tr.__PosthogExtensions__.errorWrappingFunctions = Cl, tr.__PosthogExtensions__.parseErrorAsProperties = bl, tr.posthogErrorWrappingFunctions = Cl, tr.parseErrorAsProperties = bl;
var Il = (e, t) => {
    if (e) {
        var {
            sessionId: n,
            windowId: r
        } = e.checkAndGetSessionAndWindowId(!0);
        t.headers.set("X-POSTHOG-SESSION-ID", n), t.headers.set("X-POSTHOG-WINDOW-ID", r)
    }
};
tr.__PosthogExtensions__ = tr.__PosthogExtensions__ || {};
var kl = {
    _patchFetch: e => _o(Vn, "fetch", (t => function() {
        var n = r((function*(n, r) {
            var i = new Request(n, r);
            return Il(e, i), t(i)
        }));
        return function(e, t) {
            return n.apply(this, arguments)
        }
    }())),
    _patchXHR: e => _o(Vn.XMLHttpRequest.prototype, "open", (t => function(n, r) {
        var i = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
            o = arguments.length > 3 ? arguments[3] : void 0,
            s = arguments.length > 4 ? arguments[4] : void 0,
            a = new Request(r);
        return Il(e, a), t.call(this, n, a.url, i, o, s)
    }))
};
tr.__PosthogExtensions__.tracingHeadersPatchFns = kl, tr.postHogTracingHeadersPatchFns = kl;
var El, xl, Tl, Ml = function() {
        var e = self.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
        if (e && e.responseStart > 0 && e.responseStart < performance.now()) return e
    },
    Rl = function(e) {
        if ("loading" === document.readyState) return "loading";
        var t = Ml();
        if (t) {
            if (e < t.domInteractive) return "loading";
            if (0 === t.domContentLoadedEventStart || e < t.domContentLoadedEventStart) return "dom-interactive";
            if (0 === t.domComplete || e < t.domComplete) return "dom-content-loaded"
        }
        return "complete"
    },
    Al = function(e) {
        var t = e.nodeName;
        return 1 === e.nodeType ? t.toLowerCase() : t.toUpperCase().replace(/^#/, "")
    },
    Nl = function(e, t) {
        var n = "";
        try {
            for (; e && 9 !== e.nodeType;) {
                var r = e,
                    i = r.id ? "#" + r.id : Al(r) + (r.classList && r.classList.value && r.classList.value.trim() && r.classList.value.trim().length ? "." + r.classList.value.trim().replace(/\s+/g, ".") : "");
                if (n.length + i.length > (t || 100) - 1) return n || i;
                if (n = n ? i + ">" + n : i, r.id) break;
                e = r.parentNode
            }
        } catch (e) {}
        return n
    },
    Fl = -1,
    Ol = function() {
        return Fl
    },
    Pl = function(e) {
        addEventListener("pageshow", (function(t) {
            t.persisted && (Fl = t.timeStamp, e(t))
        }), !0)
    },
    Ll = function() {
        var e = Ml();
        return e && e.activationStart || 0
    },
    Dl = function(e, t) {
        var n = Ml(),
            r = "navigate";
        return Ol() >= 0 ? r = "back-forward-cache" : n && (document.prerendering || Ll() > 0 ? r = "prerender" : document.wasDiscarded ? r = "restore" : n.type && (r = n.type.replace(/_/g, "-"))), {
            name: e,
            value: void 0 === t ? -1 : t,
            rating: "good",
            delta: 0,
            entries: [],
            id: "v4-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12),
            navigationType: r
        }
    },
    Bl = function(e, t, n) {
        try {
            if (PerformanceObserver.supportedEntryTypes.includes(e)) {
                var r = new PerformanceObserver((function(e) {
                    Promise.resolve().then((function() {
                        t(e.getEntries())
                    }))
                }));
                return r.observe(Object.assign({
                    type: e,
                    buffered: !0
                }, n || {})), r
            }
        } catch (e) {}
    },
    ql = function(e, t, n, r) {
        var i, o;
        return function(s) {
            t.value >= 0 && (s || r) && ((o = t.value - (i || 0)) || void 0 === i) && (i = t.value, t.delta = o, t.rating = function(e, t) {
                return e > t[1] ? "poor" : e > t[0] ? "needs-improvement" : "good"
            }(t.value, n), e(t))
        }
    },
    Hl = function(e) {
        requestAnimationFrame((function() {
            return requestAnimationFrame((function() {
                return e()
            }))
        }))
    },
    $l = function(e) {
        document.addEventListener("visibilitychange", (function() {
            "hidden" === document.visibilityState && e()
        }))
    },
    Wl = function(e) {
        var t = !1;
        return function() {
            t || (e(), t = !0)
        }
    },
    Vl = -1,
    Zl = function() {
        return "hidden" !== document.visibilityState || document.prerendering ? 1 / 0 : 0
    },
    Gl = function(e) {
        "hidden" === document.visibilityState && Vl > -1 && (Vl = "visibilitychange" === e.type ? e.timeStamp : 0, jl())
    },
    Ul = function() {
        addEventListener("visibilitychange", Gl, !0), addEventListener("prerenderingchange", Gl, !0)
    },
    jl = function() {
        removeEventListener("visibilitychange", Gl, !0), removeEventListener("prerenderingchange", Gl, !0)
    },
    zl = function() {
        return Vl < 0 && (Vl = Zl(), Ul(), Pl((function() {
            setTimeout((function() {
                Vl = Zl(), Ul()
            }), 0)
        }))), {
            get firstHiddenTime() {
                return Vl
            }
        }
    },
    Yl = function(e) {
        document.prerendering ? addEventListener("prerenderingchange", (function() {
            return e()
        }), !0) : e()
    },
    Xl = [1800, 3e3],
    Jl = function(e, t) {
        t = t || {}, Yl((function() {
            var n, r = zl(),
                i = Dl("FCP"),
                o = Bl("paint", (function(e) {
                    e.forEach((function(e) {
                        "first-contentful-paint" === e.name && (o.disconnect(), e.startTime < r.firstHiddenTime && (i.value = Math.max(e.startTime - Ll(), 0), i.entries.push(e), n(!0)))
                    }))
                }));
            o && (n = ql(e, i, Xl, t.reportAllChanges), Pl((function(r) {
                i = Dl("FCP"), n = ql(e, i, Xl, t.reportAllChanges), Hl((function() {
                    i.value = performance.now() - r.timeStamp, n(!0)
                }))
            })))
        }))
    },
    Kl = [.1, .25],
    Ql = 0,
    ec = 1 / 0,
    tc = 0,
    nc = function(e) {
        e.forEach((function(e) {
            e.interactionId && (ec = Math.min(ec, e.interactionId), tc = Math.max(tc, e.interactionId), Ql = tc ? (tc - ec) / 7 + 1 : 0)
        }))
    },
    rc = function() {
        "interactionCount" in performance || El || (El = Bl("event", nc, {
            type: "event",
            buffered: !0,
            durationThreshold: 0
        }))
    },
    ic = [],
    oc = new Map,
    sc = 0,
    ac = function() {
        return (El ? Ql : performance.interactionCount || 0) - sc
    },
    lc = [],
    cc = function(e) {
        if (lc.forEach((function(t) {
                return t(e)
            })), e.interactionId || "first-input" === e.entryType) {
            var t = ic[ic.length - 1],
                n = oc.get(e.interactionId);
            if (n || ic.length < 10 || e.duration > t.latency) {
                if (n) e.duration > n.latency ? (n.entries = [e], n.latency = e.duration) : e.duration === n.latency && e.startTime === n.entries[0].startTime && n.entries.push(e);
                else {
                    var r = {
                        id: e.interactionId,
                        latency: e.duration,
                        entries: [e]
                    };
                    oc.set(r.id, r), ic.push(r)
                }
                ic.sort((function(e, t) {
                    return t.latency - e.latency
                })), ic.length > 10 && ic.splice(10).forEach((function(e) {
                    return oc.delete(e.id)
                }))
            }
        }
    },
    uc = function(e) {
        var t = self.requestIdleCallback || self.setTimeout,
            n = -1;
        return e = Wl(e), "hidden" === document.visibilityState ? e() : (n = t(e), $l(e)), n
    },
    dc = [200, 500],
    hc = [],
    pc = [],
    vc = new WeakMap,
    gc = new Map,
    fc = -1,
    mc = function(e) {
        hc = hc.concat(e), _c()
    },
    _c = function() {
        fc < 0 && (fc = uc(yc))
    },
    yc = function() {
        gc.size > 10 && gc.forEach((function(e, t) {
            oc.has(t) || gc.delete(t)
        }));
        var e = ic.map((function(e) {
                return vc.get(e.entries[0])
            })),
            t = pc.length - 50;
        pc = pc.filter((function(n, r) {
            return r >= t || e.includes(n)
        }));
        for (var n = new Set, r = 0; r < pc.length; r++) {
            var i = pc[r];
            bc(i.startTime, i.processingEnd).forEach((function(e) {
                n.add(e)
            }))
        }
        for (var o = 0; o < 50; o++) {
            var s = hc[hc.length - 1 - o];
            if (!s || s.startTime < Tl) break;
            n.add(s)
        }
        hc = Array.from(n), fc = -1
    };
lc.push((function(e) {
    e.interactionId && e.target && !gc.has(e.interactionId) && gc.set(e.interactionId, e.target)
}), (function(e) {
    var t, n = e.startTime + e.duration;
    Tl = Math.max(Tl, e.processingEnd);
    for (var r = pc.length - 1; r >= 0; r--) {
        var i = pc[r];
        if (Math.abs(n - i.renderTime) <= 8) {
            (t = i).startTime = Math.min(e.startTime, t.startTime), t.processingStart = Math.min(e.processingStart, t.processingStart), t.processingEnd = Math.max(e.processingEnd, t.processingEnd), t.entries.push(e);
            break
        }
    }
    t || (t = {
        startTime: e.startTime,
        processingStart: e.processingStart,
        processingEnd: e.processingEnd,
        renderTime: n,
        entries: [e]
    }, pc.push(t)), (e.interactionId || "first-input" === e.entryType) && vc.set(e, t), _c()
}));
var bc = function(e, t) {
        for (var n, r = [], i = 0; n = hc[i]; i++)
            if (!(n.startTime + n.duration < e)) {
                if (n.startTime > t) break;
                r.push(n)
            } return r
    },
    wc = [2500, 4e3],
    Sc = {},
    Cc = {
        onLCP: function(e, t) {
            ! function(e, t) {
                t = t || {}, Yl((function() {
                    var n, r = zl(),
                        i = Dl("LCP"),
                        o = function(e) {
                            t.reportAllChanges || (e = e.slice(-1)), e.forEach((function(e) {
                                e.startTime < r.firstHiddenTime && (i.value = Math.max(e.startTime - Ll(), 0), i.entries = [e], n())
                            }))
                        },
                        s = Bl("largest-contentful-paint", o);
                    if (s) {
                        n = ql(e, i, wc, t.reportAllChanges);
                        var a = Wl((function() {
                            Sc[i.id] || (o(s.takeRecords()), s.disconnect(), Sc[i.id] = !0, n(!0))
                        }));
                        ["keydown", "click"].forEach((function(e) {
                            addEventListener(e, (function() {
                                return uc(a)
                            }), !0)
                        })), $l(a), Pl((function(r) {
                            i = Dl("LCP"), n = ql(e, i, wc, t.reportAllChanges), Hl((function() {
                                i.value = performance.now() - r.timeStamp, Sc[i.id] = !0, n(!0)
                            }))
                        }))
                    }
                }))
            }((function(t) {
                var n = function(e) {
                    var t = {
                        timeToFirstByte: 0,
                        resourceLoadDelay: 0,
                        resourceLoadDuration: 0,
                        elementRenderDelay: e.value
                    };
                    if (e.entries.length) {
                        var n = Ml();
                        if (n) {
                            var r = n.activationStart || 0,
                                i = e.entries[e.entries.length - 1],
                                o = i.url && performance.getEntriesByType("resource").filter((function(e) {
                                    return e.name === i.url
                                }))[0],
                                s = Math.max(0, n.responseStart - r),
                                a = Math.max(s, o ? (o.requestStart || o.startTime) - r : 0),
                                l = Math.max(a, o ? o.responseEnd - r : 0),
                                c = Math.max(l, i.startTime - r);
                            t = {
                                element: Nl(i.element),
                                timeToFirstByte: s,
                                resourceLoadDelay: a - s,
                                resourceLoadDuration: l - a,
                                elementRenderDelay: c - l,
                                navigationEntry: n,
                                lcpEntry: i
                            }, i.url && (t.url = i.url), o && (t.lcpResourceEntry = o)
                        }
                    }
                    return Object.assign(e, {
                        attribution: t
                    })
                }(t);
                e(n)
            }), t)
        },
        onCLS: function(e, t) {
            ! function(e, t) {
                t = t || {}, Jl(Wl((function() {
                    var n, r = Dl("CLS", 0),
                        i = 0,
                        o = [],
                        s = function(e) {
                            e.forEach((function(e) {
                                if (!e.hadRecentInput) {
                                    var t = o[0],
                                        n = o[o.length - 1];
                                    i && e.startTime - n.startTime < 1e3 && e.startTime - t.startTime < 5e3 ? (i += e.value, o.push(e)) : (i = e.value, o = [e])
                                }
                            })), i > r.value && (r.value = i, r.entries = o, n())
                        },
                        a = Bl("layout-shift", s);
                    a && (n = ql(e, r, Kl, t.reportAllChanges), $l((function() {
                        s(a.takeRecords()), n(!0)
                    })), Pl((function() {
                        i = 0, r = Dl("CLS", 0), n = ql(e, r, Kl, t.reportAllChanges), Hl((function() {
                            return n()
                        }))
                    })), setTimeout(n, 0))
                })))
            }((function(t) {
                var n = function(e) {
                    var t, n = {};
                    if (e.entries.length) {
                        var r = e.entries.reduce((function(e, t) {
                            return e && e.value > t.value ? e : t
                        }));
                        if (r && r.sources && r.sources.length) {
                            var i = (t = r.sources).find((function(e) {
                                return e.node && 1 === e.node.nodeType
                            })) || t[0];
                            i && (n = {
                                largestShiftTarget: Nl(i.node),
                                largestShiftTime: r.startTime,
                                largestShiftValue: r.value,
                                largestShiftSource: i,
                                largestShiftEntry: r,
                                loadState: Rl(r.startTime)
                            })
                        }
                    }
                    return Object.assign(e, {
                        attribution: n
                    })
                }(t);
                e(n)
            }), t)
        },
        onFCP: function(e, t) {
            Jl((function(t) {
                var n = function(e) {
                    var t = {
                        timeToFirstByte: 0,
                        firstByteToFCP: e.value,
                        loadState: Rl(Ol())
                    };
                    if (e.entries.length) {
                        var n = Ml(),
                            r = e.entries[e.entries.length - 1];
                        if (n) {
                            var i = n.activationStart || 0,
                                o = Math.max(0, n.responseStart - i);
                            t = {
                                timeToFirstByte: o,
                                firstByteToFCP: e.value - o,
                                loadState: Rl(e.entries[0].startTime),
                                navigationEntry: n,
                                fcpEntry: r
                            }
                        }
                    }
                    return Object.assign(e, {
                        attribution: t
                    })
                }(t);
                e(n)
            }), t)
        },
        onINP: function(e, t) {
            xl || (xl = Bl("long-animation-frame", mc)),
                function(e, t) {
                    "PerformanceEventTiming" in self && "interactionId" in PerformanceEventTiming.prototype && (t = t || {}, Yl((function() {
                        var n;
                        rc();
                        var r, i = Dl("INP"),
                            o = function(e) {
                                uc((function() {
                                    e.forEach(cc);
                                    var t, n = (t = Math.min(ic.length - 1, Math.floor(ac() / 50)), ic[t]);
                                    n && n.latency !== i.value && (i.value = n.latency, i.entries = n.entries, r())
                                }))
                            },
                            s = Bl("event", o, {
                                durationThreshold: null !== (n = t.durationThreshold) && void 0 !== n ? n : 40
                            });
                        r = ql(e, i, dc, t.reportAllChanges), s && (s.observe({
                            type: "first-input",
                            buffered: !0
                        }), $l((function() {
                            o(s.takeRecords()), r(!0)
                        })), Pl((function() {
                            sc = 0, ic.length = 0, oc.clear(), i = Dl("INP"), r = ql(e, i, dc, t.reportAllChanges)
                        })))
                    })))
                }((function(t) {
                    var n = function(e) {
                        var t = e.entries[0],
                            n = vc.get(t),
                            r = t.processingStart,
                            i = n.processingEnd,
                            o = n.entries.sort((function(e, t) {
                                return e.processingStart - t.processingStart
                            })),
                            s = bc(t.startTime, i),
                            a = e.entries.find((function(e) {
                                return e.target
                            })),
                            l = a && a.target || gc.get(t.interactionId),
                            c = [t.startTime + t.duration, i].concat(s.map((function(e) {
                                return e.startTime + e.duration
                            }))),
                            u = Math.max.apply(Math, c),
                            d = {
                                interactionTarget: Nl(l),
                                interactionTargetElement: l,
                                interactionType: t.name.startsWith("key") ? "keyboard" : "pointer",
                                interactionTime: t.startTime,
                                nextPaintTime: u,
                                processedEventEntries: o,
                                longAnimationFrameEntries: s,
                                inputDelay: r - t.startTime,
                                processingDuration: i - r,
                                presentationDelay: Math.max(u - i, 0),
                                loadState: Rl(t.startTime)
                            };
                        return Object.assign(e, {
                            attribution: d
                        })
                    }(t);
                    e(n)
                }), t)
        }
    };
tr.__PosthogExtensions__ = tr.__PosthogExtensions__ || {}, tr.__PosthogExtensions__.postHogWebVitalsCallbacks = Cc, tr.postHogWebVitalsCallbacks = Cc;
class Ic {
    constructor() {
        this.clicks = []
    }
    isRageClick(e, t, n) {
        var r = this.clicks[this.clicks.length - 1];
        if (r && Math.abs(e - r.x) + Math.abs(t - r.y) < 30 && n - r.timestamp < 1e3) {
            if (this.clicks.push({
                    x: e,
                    y: t,
                    timestamp: n
                }), 3 === this.clicks.length) return !0
        } else this.clicks = [{
            x: e,
            y: t,
            timestamp: n
        }];
        return !1
    }
}
var kc = Ar("[AutoCapture]");

function Ec(e, t) {
    return t.length > e ? t.slice(0, e) + "..." : t
}

function xc(e) {
    if (e.previousElementSibling) return e.previousElementSibling;
    var t = e;
    do {
        t = t.previousSibling
    } while (t && !Pi(t));
    return t
}

function Tc(e, t, n, r) {
    var i = e.tagName.toLowerCase(),
        o = {
            tag_name: i
        };
    Gi.indexOf(i) > -1 && !n && ("a" === i.toLowerCase() || "button" === i.toLowerCase() ? o.$el_text = Ec(1024, ro(e)) : o.$el_text = Ec(1024, Vi(e)));
    var s = $i(e);
    s.length > 0 && (o.classes = s.filter((function(e) {
        return "" !== e
    }))), Or(e.attributes, (function(n) {
        var i;
        if ((!Yi(e) || -1 !== ["name", "id", "class", "aria-label"].indexOf(n.name)) && ((null == r || !r.includes(n.name)) && !t && no(n.value) && (i = n.name, !yr(i) || "_ngcontent" !== i.substring(0, 10) && "_nghost" !== i.substring(0, 7)))) {
            var s = n.value;
            "class" === n.name && (s = qi(s).join(" ")), o["attr__" + n.name] = Ec(1024, s)
        }
    }));
    for (var a = 1, l = 1, c = e; c = xc(c);) a++, c.tagName === e.tagName && l++;
    return o.nth_child = a, o.nth_of_type = l, o
}

function Mc(e, t) {
    for (var n, r, {
            e: i,
            maskAllElementAttributes: o,
            maskAllText: s,
            elementAttributeIgnoreList: a,
            elementsChainAsString: l
        } = t, c = [e], u = e; u.parentNode && !Li(u, "body");) Bi(u.parentNode) ? (c.push(u.parentNode.host), u = u.parentNode.host) : (c.push(u.parentNode), u = u.parentNode);
    var d, h = [],
        p = {},
        v = !1,
        g = !1;
    if (Or(c, (e => {
            var t = zi(e);
            "a" === e.tagName.toLowerCase() && (v = e.getAttribute("href"), v = t && v && no(v) && v), or($i(e), "ph-no-capture") && (g = !0), h.push(Tc(e, o, s, a));
            var n = function(e) {
                if (!zi(e)) return {};
                var t = {};
                return Or(e.attributes, (function(e) {
                    if (e.name && 0 === e.name.indexOf("data-ph-capture-attribute")) {
                        var n = e.name.replace("data-ph-capture-attribute-", ""),
                            r = e.value;
                        n && r && no(r) && (t[n] = r)
                    }
                })), t
            }(e);
            Pr(p, n)
        })), g) return {
        props: {},
        explicitNoCapture: g
    };
    if (s || ("a" === e.tagName.toLowerCase() || "button" === e.tagName.toLowerCase() ? h[0].$el_text = ro(e) : h[0].$el_text = Vi(e)), v) {
        var f, m;
        h[0].attr__href = v;
        var _ = null === (f = Gr(v)) || void 0 === f ? void 0 : f.host,
            y = null == Vn || null === (m = Vn.location) || void 0 === m ? void 0 : m.host;
        _ && y && _ !== y && (d = v)
    }
    return {
        props: Pr({
            $event_type: i.type,
            $ce_version: 1
        }, l ? {} : {
            $elements: h
        }, {
            $elements_chain: oo(h)
        }, null !== (n = h[0]) && void 0 !== n && n.$el_text ? {
            $el_text: null === (r = h[0]) || void 0 === r ? void 0 : r.$el_text
        } : {}, d && "click" === i.type ? {
            $external_click_url: d
        } : {}, p)
    }
}
class Rc {
    constructor(e) {
        i(this, "_initialized", !1), i(this, "_isDisabledServerSide", null), i(this, "rageclicks", new Ic), i(this, "_elementsChainAsString", !1), this.instance = e, this._elementSelectors = null
    }
    get config() {
        var e, t, n = fr(this.instance.config.autocapture) ? this.instance.config.autocapture : {};
        return n.url_allowlist = null === (e = n.url_allowlist) || void 0 === e ? void 0 : e.map((e => new RegExp(e))), n.url_ignorelist = null === (t = n.url_ignorelist) || void 0 === t ? void 0 : t.map((e => new RegExp(e))), n
    }
    _addDomEventHandlers() {
        if (this.isBrowserSupported()) {
            if (Vn && Yn) {
                var e = e => {
                        e = e || (null == Vn ? void 0 : Vn.event);
                        try {
                            this._captureEvent(e)
                        } catch (e) {
                            kc.error("Failed to capture event", e)
                        }
                    },
                    t = e => {
                        e = e || (null == Vn ? void 0 : Vn.event), this._captureEvent(e, nr)
                    };
                Wr(Yn, "submit", e, !1, !0), Wr(Yn, "change", e, !1, !0), Wr(Yn, "click", e, !1, !0), this.config.capture_copied_text && (Wr(Yn, "copy", t, !1, !0), Wr(Yn, "cut", t, !1, !0))
            }
        } else kc.info("Disabling Automatic Event Collection because this browser is not supported")
    }
    startIfEnabled() {
        this.isEnabled && !this._initialized && (this._addDomEventHandlers(), this._initialized = !0)
    }
    onRemoteConfig(e) {
        e.elementsChainAsString && (this._elementsChainAsString = e.elementsChainAsString), this.instance.persistence && this.instance.persistence.register({
            [ei]: !!e.autocapture_opt_out
        }), this._isDisabledServerSide = !!e.autocapture_opt_out, this.startIfEnabled()
    }
    setElementSelectors(e) {
        this._elementSelectors = e
    }
    getElementSelectors(e) {
        var t, n = [];
        return null === (t = this._elementSelectors) || void 0 === t || t.forEach((t => {
            var r = null == Yn ? void 0 : Yn.querySelectorAll(t);
            null == r || r.forEach((r => {
                e === r && n.push(t)
            }))
        })), n
    }
    get isEnabled() {
        var e, t, n = null === (e = this.instance.persistence) || void 0 === e ? void 0 : e.props[ei],
            r = this._isDisabledServerSide;
        if (wr(r) && !Ir(n) && !this.instance.config.advanced_disable_decide) return !1;
        var i = null !== (t = this._isDisabledServerSide) && void 0 !== t ? t : !!n;
        return !!this.instance.config.autocapture && !i
    }
    _captureEvent(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "$autocapture";
        if (this.isEnabled) {
            var n, r = Zi(e);
            if (Di(r) && (r = r.parentNode || null), "$autocapture" === t && "click" === e.type && e instanceof MouseEvent) this.instance.config.rageclick && null !== (n = this.rageclicks) && void 0 !== n && n.isRageClick(e.clientX, e.clientY, (new Date).getTime()) && this._captureEvent(e, "$rageclick");
            var i = t === nr;
            if (r && ji(r, e, this.config, i, i ? ["copy", "cut"] : void 0)) {
                var {
                    props: o,
                    explicitNoCapture: s
                } = Mc(r, {
                    e: e,
                    maskAllElementAttributes: this.instance.config.mask_all_element_attributes,
                    maskAllText: this.instance.config.mask_all_text,
                    elementAttributeIgnoreList: this.config.element_attribute_ignorelist,
                    elementsChainAsString: this._elementsChainAsString
                });
                if (s) return !1;
                var a = this.getElementSelectors(r);
                if (a && a.length > 0 && (o.$element_selectors = a), t === nr) {
                    var l, c = Wi(null == Vn || null === (l = Vn.getSelection()) || void 0 === l ? void 0 : l.toString()),
                        u = e.type || "clipboard";
                    if (!c) return !1;
                    o.$selected_content = c, o.$copy_type = u
                }
                return this.instance.capture(t, o), !0
            }
        }
    }
    isBrowserSupported() {
        return pr(null == Yn ? void 0 : Yn.querySelectorAll)
    }
}
var Ac = {};

function Nc(e) {
    return function(e, t) {
        var n = Ac[e];
        if (n) return n;
        var r = t[e];
        if (vr(r) && !gr()) return Ac[e] = r.bind(t);
        var i = t.document;
        if (i && pr(i.createElement)) try {
            var o = i.createElement("iframe");
            o.hidden = !0, i.head.appendChild(o);
            var s = o.contentWindow;
            s && s[e] && (r = s[e]), i.head.removeChild(o)
        } catch (t) {
            Rr.warn("Could not create sandbox iframe for ".concat(e, " check, bailing to assignableWindow.").concat(e, ": "), t)
        }
        return r && pr(r) ? Ac[e] = r.bind(t) : r
    }("MutationObserver", e)
}

function Fc(e, t) {
    return Cr(e) && e >= t
}
class Oc {
    asRequiredConfig(e) {
        var t, n, r, i, o = this._defaultConfig((null == e ? void 0 : e.__onCapture) || this._captureDeadClick.bind(this));
        return {
            element_attribute_ignorelist: null !== (t = null == e ? void 0 : e.element_attribute_ignorelist) && void 0 !== t ? t : o.element_attribute_ignorelist,
            scroll_threshold_ms: null !== (n = null == e ? void 0 : e.scroll_threshold_ms) && void 0 !== n ? n : o.scroll_threshold_ms,
            selection_change_threshold_ms: null !== (r = null == e ? void 0 : e.selection_change_threshold_ms) && void 0 !== r ? r : o.selection_change_threshold_ms,
            mutation_threshold_ms: null !== (i = null == e ? void 0 : e.mutation_threshold_ms) && void 0 !== i ? i : o.mutation_threshold_ms,
            __onCapture: o.__onCapture
        }
    }
    constructor(e, t) {
        i(this, "_clicks", []), i(this, "_defaultConfig", (e => ({
            element_attribute_ignorelist: [],
            scroll_threshold_ms: 100,
            selection_change_threshold_ms: 100,
            mutation_threshold_ms: 2500,
            __onCapture: e
        }))), i(this, "_onClick", (e => {
            var t = function(e) {
                var t = Zi(e);
                return t ? {
                    node: t,
                    originalEvent: e,
                    timestamp: Date.now()
                } : null
            }(e);
            wr(t) || this._ignoreClick(t) || this._clicks.push(t), this._clicks.length && _r(this._checkClickTimer) && (this._checkClickTimer = tr.setTimeout((() => {
                this._checkClicks()
            }), 1e3))
        })), i(this, "_onScroll", (() => {
            var e = Date.now();
            e % 50 == 0 && this._clicks.forEach((t => {
                _r(t.scrollDelayMs) && (t.scrollDelayMs = e - t.timestamp)
            }))
        })), i(this, "_onSelectionChange", (() => {
            this._lastSelectionChanged = Date.now()
        })), this.instance = e, this._config = this.asRequiredConfig(t), this._onCapture = this._config.__onCapture
    }
    start(e) {
        this._startClickObserver(), this._startScrollObserver(), this._startSelectionChangedObserver(), this._startMutationObserver(e)
    }
    _startMutationObserver(e) {
        if (!this._mutationObserver) {
            var t = Nc(tr);
            this._mutationObserver = new t((e => {
                this.onMutation(e)
            })), this._mutationObserver.observe(e, {
                attributes: !0,
                characterData: !0,
                childList: !0,
                subtree: !0
            })
        }
    }
    stop() {
        var e;
        null === (e = this._mutationObserver) || void 0 === e || e.disconnect(), this._mutationObserver = void 0, tr.removeEventListener("click", this._onClick), tr.removeEventListener("scroll", this._onScroll, !0), tr.removeEventListener("selectionchange", this._onSelectionChange)
    }
    onMutation(e) {
        this._lastMutation = Date.now()
    }
    _startClickObserver() {
        tr.addEventListener("click", this._onClick)
    }
    _startScrollObserver() {
        tr.addEventListener("scroll", this._onScroll, !0)
    }
    _startSelectionChangedObserver() {
        tr.addEventListener("selectionchange", this._onSelectionChange)
    }
    _ignoreClick(e) {
        if (!e) return !0;
        if (Oi(e.node)) return !0;
        var t = this._clicks.some((t => t.node === e.node && Math.abs(t.timestamp - e.timestamp) < 1e3));
        return !!t || !(!Li(e.node, "html") && Pi(e.node) && !Gi.includes(e.node.tagName.toLowerCase()))
    }
    _checkClicks() {
        if (this._clicks.length) {
            clearTimeout(this._checkClickTimer), this._checkClickTimer = void 0;
            var e = this._clicks;
            for (var t of (this._clicks = [], e)) {
                var n;
                t.mutationDelayMs = null !== (n = t.mutationDelayMs) && void 0 !== n ? n : this._lastMutation && t.timestamp <= this._lastMutation ? this._lastMutation - t.timestamp : void 0, t.absoluteDelayMs = Date.now() - t.timestamp, t.selectionChangedDelayMs = this._lastSelectionChanged && t.timestamp <= this._lastSelectionChanged ? this._lastSelectionChanged - t.timestamp : void 0;
                var r = Fc(t.scrollDelayMs, this._config.scroll_threshold_ms),
                    i = Fc(t.selectionChangedDelayMs, this._config.selection_change_threshold_ms),
                    o = Fc(t.mutationDelayMs, this._config.mutation_threshold_ms),
                    s = Fc(t.absoluteDelayMs, 1.1 * this._config.mutation_threshold_ms),
                    a = Cr(t.scrollDelayMs) && t.scrollDelayMs < this._config.scroll_threshold_ms,
                    l = Cr(t.mutationDelayMs) && t.mutationDelayMs < this._config.mutation_threshold_ms,
                    c = Cr(t.selectionChangedDelayMs) && t.selectionChangedDelayMs < this._config.selection_change_threshold_ms;
                a || l || c || (r || o || s || i ? this._onCapture(t, {
                    $dead_click_last_mutation_timestamp: this._lastMutation,
                    $dead_click_event_timestamp: t.timestamp,
                    $dead_click_scroll_timeout: r,
                    $dead_click_mutation_timeout: o,
                    $dead_click_absolute_timeout: s,
                    $dead_click_selection_changed_timeout: i
                }) : t.absoluteDelayMs < this._config.mutation_threshold_ms && this._clicks.push(t))
            }
            this._clicks.length && _r(this._checkClickTimer) && (this._checkClickTimer = tr.setTimeout((() => {
                this._checkClicks()
            }), 1e3))
        }
    }
    _captureDeadClick(e, n) {
        this.instance.capture("$dead_click", t(t(t({}, n), Mc(e.node, {
            e: e.originalEvent,
            maskAllElementAttributes: this.instance.config.mask_all_element_attributes,
            maskAllText: this.instance.config.mask_all_text,
            elementAttributeIgnoreList: this._config.element_attribute_ignorelist,
            elementsChainAsString: !1
        }).props), {}, {
            $dead_click_scroll_delay_ms: e.scrollDelayMs,
            $dead_click_mutation_delay_ms: e.mutationDelayMs,
            $dead_click_absolute_delay_ms: e.absoluteDelayMs,
            $dead_click_selection_changed_delay_ms: e.selectionChangedDelayMs
        }), {
            timestamp: new Date(e.timestamp)
        })
    }
}
tr.__PosthogExtensions__ = tr.__PosthogExtensions__ || {}, tr.__PosthogExtensions__.initDeadClicksAutocapture = (e, t) => new Oc(e, t);
var Pc = Ar("[FeatureFlags]"),
    Lc = "$active_feature_flags",
    Dc = "$override_feature_flags",
    Bc = "$feature_flag_payloads",
    qc = e => {
        var t = {};
        for (var [n, r] of Dr(e || {})) r && (t[n] = r);
        return t
    };
class Hc {
    constructor(e) {
        i(this, "_override_warning", !1), i(this, "_hasLoadedFlags", !1), i(this, "_requestInFlight", !1), i(this, "_reloadingDisabled", !1), i(this, "_additionalReloadRequested", !1), i(this, "_decideCalled", !1), i(this, "_flagsLoadedFromRemote", !1), this.instance = e, this.featureFlagEventHandlers = []
    }
    decide() {
        if (this.instance.config.__preview_remote_config) this._decideCalled = !0;
        else {
            var e = !this._reloadDebouncer && (this.instance.config.advanced_disable_feature_flags || this.instance.config.advanced_disable_feature_flags_on_first_load);
            this._callDecideEndpoint({
                disableFlags: e
            })
        }
    }
    get hasLoadedFlags() {
        return this._hasLoadedFlags
    }
    getFlags() {
        return Object.keys(this.getFlagVariants())
    }
    getFlagVariants() {
        var e = this.instance.get_property(mi),
            t = this.instance.get_property(Dc);
        if (!t) return e || {};
        for (var n = Pr({}, e), r = Object.keys(t), i = 0; i < r.length; i++) n[r[i]] = t[r[i]];
        return this._override_warning || (Pc.warn(" Overriding feature flags!", {
            enabledFlags: e,
            overriddenFlags: t,
            finalFlags: n
        }), this._override_warning = !0), n
    }
    getFlagPayloads() {
        return this.instance.get_property(Bc) || {}
    }
    reloadFeatureFlags() {
        this._reloadingDisabled || this.instance.config.advanced_disable_feature_flags || this._reloadDebouncer || (this._reloadDebouncer = setTimeout((() => {
            this._callDecideEndpoint()
        }), 5))
    }
    clearDebouncer() {
        clearTimeout(this._reloadDebouncer), this._reloadDebouncer = void 0
    }
    ensureFlagsLoaded() {
        this._hasLoadedFlags || this._requestInFlight || this._reloadDebouncer || this.reloadFeatureFlags()
    }
    setAnonymousDistinctId(e) {
        this.$anon_distinct_id = e
    }
    setReloadingPaused(e) {
        this._reloadingDisabled = e
    }
    _callDecideEndpoint(e) {
        if (this.clearDebouncer(), !this.instance.config.advanced_disable_decide)
            if (this._requestInFlight) this._additionalReloadRequested = !0;
            else {
                var t = {
                    token: this.instance.config.token,
                    distinct_id: this.instance.get_distinct_id(),
                    groups: this.instance.getGroups(),
                    $anon_distinct_id: this.$anon_distinct_id,
                    person_properties: this.instance.get_property(yi),
                    group_properties: this.instance.get_property(bi)
                };
                (null != e && e.disableFlags || this.instance.config.advanced_disable_feature_flags) && (t.disable_flags = !0), this._requestInFlight = !0, this.instance._send_request({
                    method: "POST",
                    url: this.instance.requestRouter.endpointFor("api", "/decide/?v=3"),
                    data: t,
                    compression: this.instance.config.disable_compression ? void 0 : $n.Base64,
                    timeout: this.instance.config.feature_flag_request_timeout_ms,
                    callback: e => {
                        var n, r, i = !0;
                        (200 === e.statusCode && (this.$anon_distinct_id = void 0, i = !1), this._requestInFlight = !1, this._decideCalled) || (this._decideCalled = !0, this.instance._onRemoteConfig(null !== (r = e.json) && void 0 !== r ? r : {}));
                        t.disable_flags || (this._flagsLoadedFromRemote = !i, this.receivedFeatureFlags(null !== (n = e.json) && void 0 !== n ? n : {}, i), this._additionalReloadRequested && (this._additionalReloadRequested = !1, this._callDecideEndpoint()))
                    }
                })
            }
    }
    getFeatureFlag(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (this._hasLoadedFlags || this.getFlags() && this.getFlags().length > 0) {
            var n, r, i, o, s, a = this.getFlagVariants()[e],
                l = "".concat(a),
                c = this.instance.get_property(Ci) || {};
            if (t.send_event || !("send_event" in t))
                if (!(e in c) || !c[e].includes(l)) hr(c[e]) ? c[e].push(l) : c[e] = [l], null === (n = this.instance.persistence) || void 0 === n || n.register({
                    [Ci]: c
                }), this.instance.capture("$feature_flag_called", {
                    $feature_flag: e,
                    $feature_flag_response: a,
                    $feature_flag_payload: this.getFeatureFlagPayload(e) || null,
                    $feature_flag_bootstrapped_response: (null === (r = this.instance.config.bootstrap) || void 0 === r || null === (i = r.featureFlags) || void 0 === i ? void 0 : i[e]) || null,
                    $feature_flag_bootstrapped_payload: (null === (o = this.instance.config.bootstrap) || void 0 === o || null === (s = o.featureFlagPayloads) || void 0 === s ? void 0 : s[e]) || null,
                    $used_bootstrap_value: !this._flagsLoadedFromRemote
                });
            return a
        }
        Pc.warn('getFeatureFlag for key "' + e + "\" failed. Feature flags didn't load in time.")
    }
    getFeatureFlagPayload(e) {
        return this.getFlagPayloads()[e]
    }
    isFeatureEnabled(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (this._hasLoadedFlags || this.getFlags() && this.getFlags().length > 0) return !!this.getFeatureFlag(e, t);
        Pc.warn('isFeatureEnabled for key "' + e + "\" failed. Feature flags didn't load in time.")
    }
    addFeatureFlagsHandler(e) {
        this.featureFlagEventHandlers.push(e)
    }
    removeFeatureFlagsHandler(e) {
        this.featureFlagEventHandlers = this.featureFlagEventHandlers.filter((t => t !== e))
    }
    receivedFeatureFlags(e, n) {
        if (this.instance.persistence) {
            this._hasLoadedFlags = !0;
            var r = this.getFlagVariants(),
                i = this.getFlagPayloads();
            ! function(e, n) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                    o = e.featureFlags,
                    s = e.featureFlagPayloads;
                if (o)
                    if (hr(o)) {
                        var a = {};
                        if (o)
                            for (var l = 0; l < o.length; l++) a[o[l]] = !0;
                        n && n.register({
                            [Lc]: o,
                            [mi]: a
                        })
                    } else {
                        var c = o,
                            u = s;
                        e.errorsWhileComputingFlags && (c = t(t({}, r), c), u = t(t({}, i), u)), n && n.register({
                            [Lc]: Object.keys(qc(c)),
                            [mi]: c || {},
                            [Bc]: u || {}
                        })
                    }
            }(e, this.instance.persistence, r, i), this._fireFeatureFlagsCallbacks(n)
        }
    }
    override(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (!this.instance.__loaded || !this.instance.persistence) return Pc.uninitializedWarning("posthog.feature_flags.override");
        if (this._override_warning = t, !1 === e) this.instance.persistence.unregister(Dc);
        else if (hr(e)) {
            for (var n = {}, r = 0; r < e.length; r++) n[e[r]] = !0;
            this.instance.persistence.register({
                [Dc]: n
            })
        } else this.instance.persistence.register({
            [Dc]: e
        })
    }
    onFeatureFlags(e) {
        if (this.addFeatureFlagsHandler(e), this._hasLoadedFlags) {
            var {
                flags: t,
                flagVariants: n
            } = this._prepareFeatureFlagsForCallbacks();
            e(t, n)
        }
        return () => this.removeFeatureFlagsHandler(e)
    }
    updateEarlyAccessFeatureEnrollment(e, n) {
        var r, i = (this.instance.get_property(_i) || []).find((t => t.flagKey === e)),
            o = {
                ["$feature_enrollment/".concat(e)]: n
            },
            s = {
                $feature_flag: e,
                $feature_enrollment: n,
                $set: o
            };
        i && (s.$early_access_feature_name = i.name), this.instance.capture("$feature_enrollment_update", s), this.setPersonPropertiesForFlags(o, !1);
        var a = t(t({}, this.getFlagVariants()), {}, {
            [e]: n
        });
        null === (r = this.instance.persistence) || void 0 === r || r.register({
            [Lc]: Object.keys(qc(a)),
            [mi]: a
        }), this._fireFeatureFlagsCallbacks()
    }
    getEarlyAccessFeatures(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = this.instance.get_property(_i);
        if (n && !t) return e(n);
        this.instance._send_request({
            url: this.instance.requestRouter.endpointFor("api", "/api/early_access_features/?token=".concat(this.instance.config.token)),
            method: "GET",
            callback: t => {
                var n;
                if (t.json) {
                    var r = t.json.earlyAccessFeatures;
                    return null === (n = this.instance.persistence) || void 0 === n || n.register({
                        [_i]: r
                    }), e(r)
                }
            }
        })
    }
    _prepareFeatureFlagsForCallbacks() {
        var e = this.getFlags(),
            t = this.getFlagVariants();
        return {
            flags: e.filter((e => t[e])),
            flagVariants: Object.keys(t).filter((e => t[e])).reduce(((e, n) => (e[n] = t[n], e)), {})
        }
    }
    _fireFeatureFlagsCallbacks(e) {
        var {
            flags: t,
            flagVariants: n
        } = this._prepareFeatureFlagsForCallbacks();
        this.featureFlagEventHandlers.forEach((r => r(t, n, {
            errorsLoading: e
        })))
    }
    setPersonPropertiesForFlags(e) {
        var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
            r = this.instance.get_property(yi) || {};
        this.instance.register({
            [yi]: t(t({}, r), e)
        }), n && this.instance.reloadFeatureFlags()
    }
    resetPersonPropertiesForFlags() {
        this.instance.unregister(yi)
    }
    setGroupPropertiesForFlags(e) {
        var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
            r = this.instance.get_property(bi) || {};
        0 !== Object.keys(r).length && Object.keys(r).forEach((n => {
            r[n] = t(t({}, r[n]), e[n]), delete e[n]
        })), this.instance.register({
            [bi]: t(t({}, r), e)
        }), n && this.instance.reloadFeatureFlags()
    }
    resetGroupPropertiesForFlags(e) {
        if (e) {
            var n = this.instance.get_property(bi) || {};
            this.instance.register({
                [bi]: t(t({}, n), {}, {
                    [e]: {}
                })
            })
        } else this.instance.unregister(bi)
    }
}
Math.trunc || (Math.trunc = function(e) {
    return e < 0 ? Math.ceil(e) : Math.floor(e)
}), Number.isInteger || (Number.isInteger = function(e) {
    return Cr(e) && isFinite(e) && Math.floor(e) === e
});
var $c = "0123456789abcdef";
class Wc {
    constructor(e) {
        if (this.bytes = e, 16 !== e.length) throw new TypeError("not 128-bit length")
    }
    static fromFieldsV7(e, t, n, r) {
        if (!Number.isInteger(e) || !Number.isInteger(t) || !Number.isInteger(n) || !Number.isInteger(r) || e < 0 || t < 0 || n < 0 || r < 0 || e > 0xffffffffffff || t > 4095 || n > 1073741823 || r > 4294967295) throw new RangeError("invalid field value");
        var i = new Uint8Array(16);
        return i[0] = e / Math.pow(2, 40), i[1] = e / Math.pow(2, 32), i[2] = e / Math.pow(2, 24), i[3] = e / Math.pow(2, 16), i[4] = e / Math.pow(2, 8), i[5] = e, i[6] = 112 | t >>> 8, i[7] = t, i[8] = 128 | n >>> 24, i[9] = n >>> 16, i[10] = n >>> 8, i[11] = n, i[12] = r >>> 24, i[13] = r >>> 16, i[14] = r >>> 8, i[15] = r, new Wc(i)
    }
    toString() {
        for (var e = "", t = 0; t < this.bytes.length; t++) e = e + $c.charAt(this.bytes[t] >>> 4) + $c.charAt(15 & this.bytes[t]), 3 !== t && 5 !== t && 7 !== t && 9 !== t || (e += "-");
        if (36 !== e.length) throw new Error("Invalid UUIDv7 was generated");
        return e
    }
    clone() {
        return new Wc(this.bytes.slice(0))
    }
    equals(e) {
        return 0 === this.compareTo(e)
    }
    compareTo(e) {
        for (var t = 0; t < 16; t++) {
            var n = this.bytes[t] - e.bytes[t];
            if (0 !== n) return Math.sign(n)
        }
        return 0
    }
}
class Vc {
    constructor() {
        i(this, "timestamp", 0), i(this, "counter", 0), i(this, "random", new Uc)
    }
    generate() {
        var e = this.generateOrAbort();
        if (_r(e)) {
            this.timestamp = 0;
            var t = this.generateOrAbort();
            if (_r(t)) throw new Error("Could not generate UUID after timestamp reset");
            return t
        }
        return e
    }
    generateOrAbort() {
        var e = Date.now();
        if (e > this.timestamp) this.timestamp = e, this.resetCounter();
        else {
            if (!(e + 1e4 > this.timestamp)) return;
            this.counter++, this.counter > 4398046511103 && (this.timestamp++, this.resetCounter())
        }
        return Wc.fromFieldsV7(this.timestamp, Math.trunc(this.counter / Math.pow(2, 30)), this.counter & Math.pow(2, 30) - 1, this.random.nextUint32())
    }
    resetCounter() {
        this.counter = 1024 * this.random.nextUint32() + (1023 & this.random.nextUint32())
    }
}
var Zc, Gc = e => {
    if ("undefined" != typeof UUIDV7_DENY_WEAK_RNG && UUIDV7_DENY_WEAK_RNG) throw new Error("no cryptographically strong RNG available");
    for (var t = 0; t < e.length; t++) e[t] = 65536 * Math.trunc(65536 * Math.random()) + Math.trunc(65536 * Math.random());
    return e
};
Vn && !_r(Vn.crypto) && crypto.getRandomValues && (Gc = e => crypto.getRandomValues(e));
class Uc {
    constructor() {
        i(this, "buffer", new Uint32Array(8)), i(this, "cursor", 1 / 0)
    }
    nextUint32() {
        return this.cursor >= this.buffer.length && (Gc(this.buffer), this.cursor = 0), this.buffer[this.cursor++]
    }
}
var jc = () => zc().toString(),
    zc = () => (Zc || (Zc = new Vc)).generate(),
    Yc = "Thu, 01 Jan 1970 00:00:00 GMT",
    Xc = "";
var Jc = /[a-z0-9][a-z0-9-]+\.[a-z]{2,}$/i;

function Kc(e, t) {
    if (t) {
        var n = function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Yn;
            if (Xc) return Xc;
            if (!t) return "";
            if (["localhost", "127.0.0.1"].includes(e)) return "";
            for (var n = e.split("."), r = Math.min(n.length, 8), i = "dmn_chk_" + jc(), o = new RegExp("(^|;)\\s*" + i + "=1"); !Xc && r--;) {
                var s = n.slice(r).join("."),
                    a = i + "=1;domain=." + s;
                t.cookie = a, o.test(t.cookie) && (t.cookie = a + ";expires=" + Yc, Xc = s)
            }
            return Xc
        }(e);
        if (!n) {
            var r = (e => {
                var t = e.match(Jc);
                return t ? t[0] : ""
            })(e);
            r !== n && Rr.info("Warning: cookie subdomain discovery mismatch", r, n), n = r
        }
        return n ? "; domain=." + n : ""
    }
    return ""
}
var Qc = {
        is_supported: () => !!Yn,
        error: function(e) {
            Rr.error("cookieStore error: " + e)
        },
        get: function(e) {
            if (Yn) {
                try {
                    for (var t = e + "=", n = Yn.cookie.split(";").filter((e => e.length)), r = 0; r < n.length; r++) {
                        for (var i = n[r];
                            " " == i.charAt(0);) i = i.substring(1, i.length);
                        if (0 === i.indexOf(t)) return decodeURIComponent(i.substring(t.length, i.length))
                    }
                } catch (e) {}
                return null
            }
        },
        parse: function(e) {
            var t;
            try {
                t = JSON.parse(Qc.get(e)) || {}
            } catch (e) {}
            return t
        },
        set: function(e, t, n, r, i) {
            if (Yn) try {
                var o = "",
                    s = "",
                    a = Kc(Yn.location.hostname, r);
                if (n) {
                    var l = new Date;
                    l.setTime(l.getTime() + 24 * n * 60 * 60 * 1e3), o = "; expires=" + l.toUTCString()
                }
                i && (s = "; secure");
                var c = e + "=" + encodeURIComponent(JSON.stringify(t)) + o + "; SameSite=Lax; path=/" + a + s;
                return c.length > 3686.4 && Rr.warn("cookieStore warning: large cookie, len=" + c.length), Yn.cookie = c, c
            } catch (e) {
                return
            }
        },
        remove: function(e, t) {
            try {
                Qc.set(e, "", -1, t)
            } catch (e) {
                return
            }
        }
    },
    eu = null,
    tu = {
        is_supported: function() {
            if (!wr(eu)) return eu;
            var e = !0;
            if (_r(Vn)) e = !1;
            else try {
                var t = "__mplssupport__";
                tu.set(t, "xyz"), '"xyz"' !== tu.get(t) && (e = !1), tu.remove(t)
            } catch (t) {
                e = !1
            }
            return e || Rr.error("localStorage unsupported; falling back to cookie store"), eu = e, e
        },
        error: function(e) {
            Rr.error("localStorage error: " + e)
        },
        get: function(e) {
            try {
                return null == Vn ? void 0 : Vn.localStorage.getItem(e)
            } catch (e) {
                tu.error(e)
            }
            return null
        },
        parse: function(e) {
            try {
                return JSON.parse(tu.get(e)) || {}
            } catch (e) {}
            return null
        },
        set: function(e, t) {
            try {
                null == Vn || Vn.localStorage.setItem(e, JSON.stringify(t))
            } catch (e) {
                tu.error(e)
            }
        },
        remove: function(e) {
            try {
                null == Vn || Vn.localStorage.removeItem(e)
            } catch (e) {
                tu.error(e)
            }
        }
    },
    nu = ["distinct_id", pi, vi, Ri, Mi],
    ru = t(t({}, tu), {}, {
        parse: function(e) {
            try {
                var t = {};
                try {
                    t = Qc.parse(e) || {}
                } catch (e) {}
                var n = Pr(t, JSON.parse(tu.get(e) || "{}"));
                return tu.set(e, n), n
            } catch (e) {}
            return null
        },
        set: function(e, t, n, r, i, o) {
            try {
                tu.set(e, t, void 0, void 0, o);
                var s = {};
                nu.forEach((e => {
                    t[e] && (s[e] = t[e])
                })), Object.keys(s).length && Qc.set(e, s, n, r, i, o)
            } catch (e) {
                tu.error(e)
            }
        },
        remove: function(e, t) {
            try {
                null == Vn || Vn.localStorage.removeItem(e), Qc.remove(e, t)
            } catch (e) {
                tu.error(e)
            }
        }
    }),
    iu = {},
    ou = {
        is_supported: function() {
            return !0
        },
        error: function(e) {
            Rr.error("memoryStorage error: " + e)
        },
        get: function(e) {
            return iu[e] || null
        },
        parse: function(e) {
            return iu[e] || null
        },
        set: function(e, t) {
            iu[e] = t
        },
        remove: function(e) {
            delete iu[e]
        }
    },
    su = null,
    au = {
        is_supported: function() {
            if (!wr(su)) return su;
            if (su = !0, _r(Vn)) su = !1;
            else try {
                var e = "__support__";
                au.set(e, "xyz"), '"xyz"' !== au.get(e) && (su = !1), au.remove(e)
            } catch (e) {
                su = !1
            }
            return su
        },
        error: function(e) {
            Rr.error("sessionStorage error: ", e)
        },
        get: function(e) {
            try {
                return null == Vn ? void 0 : Vn.sessionStorage.getItem(e)
            } catch (e) {
                au.error(e)
            }
            return null
        },
        parse: function(e) {
            try {
                return JSON.parse(au.get(e)) || null
            } catch (e) {}
            return null
        },
        set: function(e, t) {
            try {
                null == Vn || Vn.sessionStorage.setItem(e, JSON.stringify(t))
            } catch (e) {
                au.error(e)
            }
        },
        remove: function(e) {
            try {
                null == Vn || Vn.sessionStorage.removeItem(e)
            } catch (e) {
                au.error(e)
            }
        }
    },
    lu = "Mobile",
    cu = "iOS",
    uu = "Android",
    du = "Tablet",
    hu = uu + " " + du,
    pu = "iPad",
    vu = "Apple",
    gu = vu + " Watch",
    fu = "Safari",
    mu = "BlackBerry",
    _u = "Samsung",
    yu = _u + "Browser",
    bu = _u + " Internet",
    wu = "Chrome",
    Su = wu + " OS",
    Cu = wu + " " + cu,
    Iu = "Internet Explorer",
    ku = Iu + " " + lu,
    Eu = "Opera",
    xu = Eu + " Mini",
    Tu = "Edge",
    Mu = "Microsoft " + Tu,
    Ru = "Firefox",
    Au = Ru + " " + cu,
    Nu = "Nintendo",
    Fu = "PlayStation",
    Ou = "Xbox",
    Pu = uu + " " + lu,
    Lu = lu + " " + fu,
    Du = "Windows",
    Bu = Du + " Phone",
    qu = "Nokia",
    Hu = "Ouya",
    $u = "Generic",
    Wu = $u + " " + lu.toLowerCase(),
    Vu = $u + " " + du.toLowerCase(),
    Zu = "Konqueror",
    Gu = "(\\d+(\\.\\d+)?)",
    Uu = new RegExp("Version/" + Gu),
    ju = new RegExp(Ou, "i"),
    zu = new RegExp(Fu + " \\w+", "i"),
    Yu = new RegExp(Nu + " \\w+", "i"),
    Xu = new RegExp(mu + "|PlayBook|BB10", "i"),
    Ju = {
        "NT3.51": "NT 3.11",
        "NT4.0": "NT 4.0",
        "5.0": "2000",
        5.1: "XP",
        5.2: "XP",
        "6.0": "Vista",
        6.1: "7",
        6.2: "8",
        6.3: "8.1",
        6.4: "10",
        "10.0": "10"
    };
var Ku = (e, t) => t && or(t, vu) || function(e) {
        return or(e, fu) && !or(e, wu) && !or(e, uu)
    }(e),
    Qu = function(e, t) {
        return t = t || "", or(e, " OPR/") && or(e, "Mini") ? xu : or(e, " OPR/") ? Eu : Xu.test(e) ? mu : or(e, "IE" + lu) || or(e, "WPDesktop") ? ku : or(e, yu) ? bu : or(e, Tu) || or(e, "Edg/") ? Mu : or(e, "FBIOS") ? "Facebook " + lu : or(e, "UCWEB") || or(e, "UCBrowser") ? "UC Browser" : or(e, "CriOS") ? Cu : or(e, "CrMo") || or(e, wu) ? wu : or(e, uu) && or(e, fu) ? Pu : or(e, "FxiOS") ? Au : or(e.toLowerCase(), Zu.toLowerCase()) ? Zu : Ku(e, t) ? or(e, lu) ? Lu : fu : or(e, Ru) ? Ru : or(e, "MSIE") || or(e, "Trident/") ? Iu : or(e, "Gecko") ? Ru : ""
    },
    ed = {
        [ku]: [new RegExp("rv:" + Gu)],
        [Mu]: [new RegExp(Tu + "?\\/" + Gu)],
        [wu]: [new RegExp("(" + wu + "|CrMo)\\/" + Gu)],
        [Cu]: [new RegExp("CriOS\\/" + Gu)],
        "UC Browser": [new RegExp("(UCBrowser|UCWEB)\\/" + Gu)],
        [fu]: [Uu],
        [Lu]: [Uu],
        [Eu]: [new RegExp("(Opera|OPR)\\/" + Gu)],
        [Ru]: [new RegExp(Ru + "\\/" + Gu)],
        [Au]: [new RegExp("FxiOS\\/" + Gu)],
        [Zu]: [new RegExp("Konqueror[:/]?" + Gu, "i")],
        [mu]: [new RegExp(mu + " " + Gu), Uu],
        [Pu]: [new RegExp("android\\s" + Gu, "i")],
        [bu]: [new RegExp(yu + "\\/" + Gu)],
        [Iu]: [new RegExp("(rv:|MSIE )" + Gu)],
        Mozilla: [new RegExp("rv:" + Gu)]
    },
    td = [
        [new RegExp(Ou + "; " + Ou + " (.*?)[);]", "i"), e => [Ou, e && e[1] || ""]],
        [new RegExp(Nu, "i"), [Nu, ""]],
        [new RegExp(Fu, "i"), [Fu, ""]],
        [Xu, [mu, ""]],
        [new RegExp(Du, "i"), (e, t) => {
            if (/Phone/.test(t) || /WPDesktop/.test(t)) return [Bu, ""];
            if (new RegExp(lu).test(t) && !/IEMobile\b/.test(t)) return [Du + " " + lu, ""];
            var n = /Windows NT ([0-9.]+)/i.exec(t);
            if (n && n[1]) {
                var r = n[1],
                    i = Ju[r] || "";
                return /arm/i.test(t) && (i = "RT"), [Du, i]
            }
            return [Du, ""]
        }],
        [/((iPhone|iPad|iPod).*?OS (\d+)_(\d+)_?(\d+)?|iPhone)/, e => {
            if (e && e[3]) {
                var t = [e[3], e[4], e[5] || "0"];
                return [cu, t.join(".")]
            }
            return [cu, ""]
        }],
        [/(watch.*\/(\d+\.\d+\.\d+)|watch os,(\d+\.\d+),)/i, e => {
            var t = "";
            return e && e.length >= 3 && (t = _r(e[2]) ? e[3] : e[2]), ["watchOS", t]
        }],
        [new RegExp("(" + uu + " (\\d+)\\.(\\d+)\\.?(\\d+)?|" + uu + ")", "i"), e => {
            if (e && e[2]) {
                var t = [e[2], e[3], e[4] || "0"];
                return [uu, t.join(".")]
            }
            return [uu, ""]
        }],
        [/Mac OS X (\d+)[_.](\d+)[_.]?(\d+)?/i, e => {
            var t = ["Mac OS X", ""];
            if (e && e[1]) {
                var n = [e[1], e[2], e[3] || "0"];
                t[1] = n.join(".")
            }
            return t
        }],
        [/Mac/i, ["Mac OS X", ""]],
        [/CrOS/, [Su, ""]],
        [/Linux|debian/i, ["Linux", ""]]
    ],
    nd = function(e) {
        return Yu.test(e) ? Nu : zu.test(e) ? Fu : ju.test(e) ? Ou : new RegExp(Hu, "i").test(e) ? Hu : new RegExp("(" + Bu + "|WPDesktop)", "i").test(e) ? Bu : /iPad/.test(e) ? pu : /iPod/.test(e) ? "iPod Touch" : /iPhone/.test(e) ? "iPhone" : /(watch)(?: ?os[,/]|\d,\d\/)[\d.]+/i.test(e) ? gu : Xu.test(e) ? mu : /(kobo)\s(ereader|touch)/i.test(e) ? "Kobo" : new RegExp(qu, "i").test(e) ? qu : /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i.test(e) || /(kf[a-z]+)( bui|\)).+silk\//i.test(e) ? "Kindle Fire" : /(Android|ZTE)/i.test(e) ? !new RegExp(lu).test(e) || /(9138B|TB782B|Nexus [97]|pixel c|HUAWEISHT|BTV|noble nook|smart ultra 6)/i.test(e) ? /pixel[\daxl ]{1,6}/i.test(e) && !/pixel c/i.test(e) || /(huaweimed-al00|tah-|APA|SM-G92|i980|zte|U304AA)/i.test(e) || /lmy47v/i.test(e) && !/QTAQZ3/i.test(e) ? uu : hu : uu : new RegExp("(pda|" + lu + ")", "i").test(e) ? Wu : new RegExp(du, "i").test(e) && !new RegExp(du + " pc", "i").test(e) ? Vu : ""
    },
    rd = "https?://(.*)",
    id = ["gclid", "gclsrc", "dclid", "gbraid", "wbraid", "fbclid", "msclkid", "twclid", "li_fat_id", "igshid", "ttclid", "rdt_cid", "irclid", "_kx"],
    od = Lr(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gad_source", "mc_cid"], id),
    sd = "<masked>",
    ad = {
        campaignParams: function() {
            var {
                customTrackedParams: e,
                maskPersonalDataProperties: t,
                customPersonalDataProperties: n
            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (!Yn) return {};
            var r = t ? Lr([], id, n || []) : [];
            return this._campaignParamsFromUrl(Yr(Yn.URL, r, sd), e)
        },
        _campaignParamsFromUrl: function(e, t) {
            var n = od.concat(t || []),
                r = {};
            return Or(n, (function(t) {
                var n = zr(e, t);
                r[t] = n || null
            })), r
        },
        _searchEngine: function(e) {
            return e ? 0 === e.search(rd + "google.([^/?]*)") ? "google" : 0 === e.search(rd + "bing.com") ? "bing" : 0 === e.search(rd + "yahoo.com") ? "yahoo" : 0 === e.search(rd + "duckduckgo.com") ? "duckduckgo" : null : null
        },
        _searchInfoFromReferrer: function(e) {
            var t = ad._searchEngine(e),
                n = "yahoo" != t ? "q" : "p",
                r = {};
            if (!wr(t)) {
                r.$search_engine = t;
                var i = Yn ? zr(Yn.referrer, n) : "";
                i.length && (r.ph_keyword = i)
            }
            return r
        },
        searchInfo: function() {
            var e = null == Yn ? void 0 : Yn.referrer;
            return e ? this._searchInfoFromReferrer(e) : {}
        },
        browser: Qu,
        browserVersion: function(e, t) {
            var n = Qu(e, t),
                r = ed[n];
            if (_r(r)) return null;
            for (var i = 0; i < r.length; i++) {
                var o = r[i],
                    s = e.match(o);
                if (s) return parseFloat(s[s.length - 2])
            }
            return null
        },
        browserLanguage: function() {
            return navigator.language || navigator.userLanguage
        },
        browserLanguagePrefix: function() {
            var e = this.browserLanguage();
            return "string" == typeof e ? e.split("-")[0] : void 0
        },
        os: function(e) {
            for (var t = 0; t < td.length; t++) {
                var [n, r] = td[t], i = n.exec(e), o = i && (pr(r) ? r(i, e) : r);
                if (o) return o
            }
            return ["", ""]
        },
        device: nd,
        deviceType: function(e) {
            var t = nd(e);
            return t === pu || t === hu || "Kobo" === t || "Kindle Fire" === t || t === Vu ? du : t === Nu || t === Ou || t === Fu || t === Hu ? "Console" : t === gu ? "Wearable" : t ? lu : "Desktop"
        },
        referrer: function() {
            return (null == Yn ? void 0 : Yn.referrer) || "$direct"
        },
        referringDomain: function() {
            var e;
            return null != Yn && Yn.referrer && (null === (e = Gr(Yn.referrer)) || void 0 === e ? void 0 : e.host) || "$direct"
        },
        referrerInfo: function() {
            return {
                $referrer: this.referrer(),
                $referring_domain: this.referringDomain()
            }
        },
        initialPersonInfo: function() {
            return {
                r: this.referrer().substring(0, 1e3),
                u: null == Xn ? void 0 : Xn.href.substring(0, 1e3)
            }
        },
        initialPersonPropsFromInfo: function(e) {
            var t, {
                    r: n,
                    u: r
                } = e,
                i = {
                    $initial_referrer: n,
                    $initial_referring_domain: null == n ? void 0 : "$direct" == n ? "$direct" : null === (t = Gr(n)) || void 0 === t ? void 0 : t.host
                };
            if (r) {
                i.$initial_current_url = r;
                var o = Gr(r);
                i.$initial_host = null == o ? void 0 : o.host, i.$initial_pathname = null == o ? void 0 : o.pathname, Or(this._campaignParamsFromUrl(r), (function(e, t) {
                    i["$initial_" + ar(t)] = e
                }))
            }
            n && Or(this._searchInfoFromReferrer(n), (function(e, t) {
                i["$initial_" + ar(t)] = e
            }));
            return i
        },
        timezone: function() {
            try {
                return Intl.DateTimeFormat().resolvedOptions().timeZone
            } catch (e) {
                return
            }
        },
        timezoneOffset: function() {
            try {
                return (new Date).getTimezoneOffset()
            } catch (e) {
                return
            }
        },
        properties: function() {
            var {
                maskPersonalDataProperties: e,
                customPersonalDataProperties: t
            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (!er) return {};
            var n = e ? Lr([], id, t || []) : [],
                [r, i] = ad.os(er);
            return Pr(Hr({
                $os: r,
                $os_version: i,
                $browser: ad.browser(er, navigator.vendor),
                $device: ad.device(er),
                $device_type: ad.deviceType(er),
                $timezone: ad.timezone(),
                $timezone_offset: ad.timezoneOffset()
            }), {
                $current_url: Yr(null == Xn ? void 0 : Xn.href, n, sd),
                $host: null == Xn ? void 0 : Xn.host,
                $pathname: null == Xn ? void 0 : Xn.pathname,
                $raw_user_agent: er.length > 1e3 ? er.substring(0, 997) + "..." : er,
                $browser_version: ad.browserVersion(er, navigator.vendor),
                $browser_language: ad.browserLanguage(),
                $browser_language_prefix: ad.browserLanguagePrefix(),
                $screen_height: null == Vn ? void 0 : Vn.screen.height,
                $screen_width: null == Vn ? void 0 : Vn.screen.width,
                $viewport_height: null == Vn ? void 0 : Vn.innerHeight,
                $viewport_width: null == Vn ? void 0 : Vn.innerWidth,
                $lib: "web",
                $lib_version: Tr.LIB_VERSION,
                $insert_id: Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10),
                $time: Date.now() / 1e3
            })
        },
        people_properties: function() {
            if (!er) return {};
            var [e, t] = ad.os(er);
            return Pr(Hr({
                $os: e,
                $os_version: t,
                $browser: ad.browser(er, navigator.vendor)
            }), {
                $browser_version: ad.browserVersion(er, navigator.vendor)
            })
        }
    },
    ld = ["cookie", "localstorage", "localstorage+cookie", "sessionstorage", "memory"];
class cd {
    constructor(e) {
        this.config = e, this.props = {}, this.campaign_params_saved = !1, this.name = (e => {
            var t = "";
            return e.token && (t = e.token.replace(/\+/g, "PL").replace(/\//g, "SL").replace(/=/g, "EQ")), e.persistence_name ? "ph_" + e.persistence_name : "ph_" + t + "_posthog"
        })(e), this.storage = this.buildStorage(e), this.load(), e.debug && Rr.info("Persistence loaded", e.persistence, t({}, this.props)), this.update_config(e, e), this.save()
    }
    buildStorage(e) {
        -1 === ld.indexOf(e.persistence.toLowerCase()) && (Rr.critical("Unknown persistence type " + e.persistence + "; falling back to localStorage+cookie"), e.persistence = "localStorage+cookie");
        var t = e.persistence.toLowerCase();
        return "localstorage" === t && tu.is_supported() ? tu : "localstorage+cookie" === t && ru.is_supported() ? ru : "sessionstorage" === t && au.is_supported() ? au : "memory" === t ? ou : "cookie" === t ? Qc : ru.is_supported() ? ru : Qc
    }
    properties() {
        var e = {};
        return Or(this.props, (function(t, n) {
            if (n === mi && fr(t))
                for (var r = Object.keys(t), i = 0; i < r.length; i++) e["$feature/".concat(r[i])] = t[r[i]];
            else s = n, a = !1, (wr(o = Fi) ? a : jn && o.indexOf === jn ? -1 != o.indexOf(s) : (Or(o, (function(e) {
                if (a || (a = e === s)) return Nr
            })), a)) || (e[n] = t);
            var o, s, a
        })), e
    }
    load() {
        if (!this.disabled) {
            var e = this.storage.parse(this.name);
            e && (this.props = Pr({}, e))
        }
    }
    save() {
        this.disabled || this.storage.set(this.name, this.props, this.expire_days, this.cross_subdomain, this.secure, this.config.debug)
    }
    remove() {
        this.storage.remove(this.name, !1), this.storage.remove(this.name, !0)
    }
    clear() {
        this.remove(), this.props = {}
    }
    register_once(e, t, n) {
        if (fr(e)) {
            _r(t) && (t = "None"), this.expire_days = _r(n) ? this.default_expiry : n;
            var r = !1;
            if (Or(e, ((e, n) => {
                    this.props.hasOwnProperty(n) && this.props[n] !== t || (this.props[n] = e, r = !0)
                })), r) return this.save(), !0
        }
        return !1
    }
    register(e, t) {
        if (fr(e)) {
            this.expire_days = _r(t) ? this.default_expiry : t;
            var n = !1;
            if (Or(e, ((t, r) => {
                    e.hasOwnProperty(r) && this.props[r] !== t && (this.props[r] = t, n = !0)
                })), n) return this.save(), !0
        }
        return !1
    }
    unregister(e) {
        e in this.props && (delete this.props[e], this.save())
    }
    update_campaign_params() {
        if (!this.campaign_params_saved) {
            var e = ad.campaignParams({
                customTrackedParams: this.config.custom_campaign_params,
                maskPersonalDataProperties: this.config.mask_personal_data_properties,
                customPersonalDataProperties: this.config.custom_personal_data_properties
            });
            mr(Hr(e)) || this.register(e), this.campaign_params_saved = !0
        }
    }
    update_search_keyword() {
        this.register(ad.searchInfo())
    }
    update_referrer_info() {
        this.register_once(ad.referrerInfo(), void 0)
    }
    set_initial_person_info() {
        this.props[xi] || this.props[Ti] || this.register_once({
            [Mi]: ad.initialPersonInfo()
        }, void 0)
    }
    get_referrer_info() {
        return Hr({
            $referrer: this.props.$referrer,
            $referring_domain: this.props.$referring_domain
        })
    }
    get_initial_props() {
        var e = {};
        Or([Ti, xi], (t => {
            var n = this.props[t];
            n && Or(n, (function(t, n) {
                e["$initial_" + ar(n)] = t
            }))
        }));
        var t = this.props[Mi];
        if (t) {
            var n = ad.initialPersonPropsFromInfo(t);
            Pr(e, n)
        }
        return e
    }
    safe_merge(e) {
        return Or(this.props, (function(t, n) {
            n in e || (e[n] = t)
        })), e
    }
    update_config(e, t) {
        if (this.default_expiry = this.expire_days = e.cookie_expiration, this.set_disabled(e.disable_persistence), this.set_cross_subdomain(e.cross_subdomain_cookie), this.set_secure(e.secure_cookie), e.persistence !== t.persistence) {
            var n = this.buildStorage(e),
                r = this.props;
            this.clear(), this.storage = n, this.props = r, this.save()
        }
    }
    set_disabled(e) {
        this.disabled = e, this.disabled ? this.remove() : this.save()
    }
    set_cross_subdomain(e) {
        e !== this.cross_subdomain && (this.cross_subdomain = e, this.remove(), this.save())
    }
    get_cross_subdomain() {
        return !!this.cross_subdomain
    }
    set_secure(e) {
        e !== this.secure && (this.secure = e, this.remove(), this.save())
    }
    set_event_timer(e, t) {
        var n = this.props[Qr] || {};
        n[e] = t, this.props[Qr] = n, this.save()
    }
    remove_event_timer(e) {
        var t = (this.props[Qr] || {})[e];
        return _r(t) || (delete this.props[Qr][e], this.save()), t
    }
    get_property(e) {
        return this.props[e]
    }
    set_property(e, t) {
        this.props[e] = t, this.save()
    }
}

function ud(e) {
    var t, n;
    return (null === (t = JSON.stringify(e, (n = [], function(e, t) {
        if (fr(t)) {
            for (; n.length > 0 && n[n.length - 1] !== this;) n.pop();
            return n.includes(t) ? "[Circular]" : (n.push(t), t)
        }
        return t
    }))) || void 0 === t ? void 0 : t.length) || 0
}

function dd(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 6606028.8;
    if (e.size >= t && e.data.length > 1) {
        var n = Math.floor(e.data.length / 2),
            r = e.data.slice(0, n),
            i = e.data.slice(n);
        return [dd({
            size: ud(r),
            data: r,
            sessionId: e.sessionId,
            windowId: e.windowId
        }), dd({
            size: ud(i),
            data: i,
            sessionId: e.sessionId,
            windowId: e.windowId
        })].flatMap((e => e))
    }
    return [e]
}
var hd = (e => (e[e.DomContentLoaded = 0] = "DomContentLoaded", e[e.Load = 1] = "Load", e[e.FullSnapshot = 2] = "FullSnapshot", e[e.IncrementalSnapshot = 3] = "IncrementalSnapshot", e[e.Meta = 4] = "Meta", e[e.Custom = 5] = "Custom", e[e.Plugin = 6] = "Plugin", e))(hd || {}),
    pd = (e => (e[e.Mutation = 0] = "Mutation", e[e.MouseMove = 1] = "MouseMove", e[e.MouseInteraction = 2] = "MouseInteraction", e[e.Scroll = 3] = "Scroll", e[e.ViewportResize = 4] = "ViewportResize", e[e.Input = 5] = "Input", e[e.TouchMove = 6] = "TouchMove", e[e.MediaInteraction = 7] = "MediaInteraction", e[e.StyleSheetRule = 8] = "StyleSheetRule", e[e.CanvasMutation = 9] = "CanvasMutation", e[e.Font = 10] = "Font", e[e.Log = 11] = "Log", e[e.Drag = 12] = "Drag", e[e.StyleDeclaration = 13] = "StyleDeclaration", e[e.Selection = 14] = "Selection", e[e.AdoptedStyleSheet = 15] = "AdoptedStyleSheet", e[e.CustomElement = 16] = "CustomElement", e))(pd || {});

function vd(e, t, n, r, i) {
    return t > n && (Rr.warn("min cannot be greater than max."), t = n), Cr(e) ? e > n ? (r && Rr.warn(r + " cannot be  greater than max: " + n + ". Using max value instead."), n) : e < t ? (r && Rr.warn(r + " cannot be less than min: " + t + ". Using min value instead."), t) : e : (r && Rr.warn(r + " must be a number. using max or fallback. max: " + n + ", fallback: " + i), vd(i || n, t, n, r))
}
class gd {
    constructor(e) {
        var t, n, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        i(this, "bucketSize", 100), i(this, "refillRate", 10), i(this, "mutationBuckets", {}), i(this, "loggedTracker", {}), i(this, "refillBuckets", (() => {
            Object.keys(this.mutationBuckets).forEach((e => {
                this.mutationBuckets[e] = this.mutationBuckets[e] + this.refillRate, this.mutationBuckets[e] >= this.bucketSize && delete this.mutationBuckets[e]
            }))
        })), i(this, "getNodeOrRelevantParent", (e => {
            var t = this.rrweb.mirror.getNode(e);
            if ("svg" !== (null == t ? void 0 : t.nodeName) && t instanceof Element) {
                var n = t.closest("svg");
                if (n) return [this.rrweb.mirror.getId(n), n]
            }
            return [e, t]
        })), i(this, "numberOfChanges", (e => {
            var t, n, r, i, o, s, a, l;
            return (null !== (t = null === (n = e.removes) || void 0 === n ? void 0 : n.length) && void 0 !== t ? t : 0) + (null !== (r = null === (i = e.attributes) || void 0 === i ? void 0 : i.length) && void 0 !== r ? r : 0) + (null !== (o = null === (s = e.texts) || void 0 === s ? void 0 : s.length) && void 0 !== o ? o : 0) + (null !== (a = null === (l = e.adds) || void 0 === l ? void 0 : l.length) && void 0 !== a ? a : 0)
        })), i(this, "throttleMutations", (e => {
            if (3 !== e.type || 0 !== e.data.source) return e;
            var t = e.data,
                n = this.numberOfChanges(t);
            t.attributes && (t.attributes = t.attributes.filter((e => {
                var t, n, r, [i, o] = this.getNodeOrRelevantParent(e.id);
                if (0 === this.mutationBuckets[i]) return !1;
                (this.mutationBuckets[i] = null !== (t = this.mutationBuckets[i]) && void 0 !== t ? t : this.bucketSize, this.mutationBuckets[i] = Math.max(this.mutationBuckets[i] - 1, 0), 0 === this.mutationBuckets[i]) && (this.loggedTracker[i] || (this.loggedTracker[i] = !0, null === (n = (r = this.options).onBlockedNode) || void 0 === n || n.call(r, i, o)));
                return e
            })));
            var r = this.numberOfChanges(t);
            return 0 !== r || n === r ? e : void 0
        })), this.rrweb = e, this.options = r, this.refillRate = vd(null !== (t = this.options.refillRate) && void 0 !== t ? t : this.refillRate, 0, 100, "mutation throttling refill rate"), this.bucketSize = vd(null !== (n = this.options.bucketSize) && void 0 !== n ? n : this.bucketSize, 0, 100, "mutation throttling bucket size"), setInterval((() => {
            this.refillBuckets()
        }), 1e3)
    }
}
var fd = Uint8Array,
    md = Uint16Array,
    _d = Uint32Array,
    yd = new fd([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
    bd = new fd([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
    wd = new fd([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
    Sd = function(e, t) {
        for (var n = new md(31), r = 0; r < 31; ++r) n[r] = t += 1 << e[r - 1];
        var i = new _d(n[30]);
        for (r = 1; r < 30; ++r)
            for (var o = n[r]; o < n[r + 1]; ++o) i[o] = o - n[r] << 5 | r;
        return [n, i]
    },
    Cd = Sd(yd, 2),
    Id = Cd[0],
    kd = Cd[1];
Id[28] = 258, kd[258] = 28;
for (var Ed = Sd(bd, 0)[1], xd = new md(32768), Td = 0; Td < 32768; ++Td) {
    var Md = (43690 & Td) >>> 1 | (21845 & Td) << 1;
    Md = (61680 & (Md = (52428 & Md) >>> 2 | (13107 & Md) << 2)) >>> 4 | (3855 & Md) << 4, xd[Td] = ((65280 & Md) >>> 8 | (255 & Md) << 8) >>> 1
}
var Rd = function(e, t, n) {
        for (var r = e.length, i = 0, o = new md(t); i < r; ++i) ++o[e[i] - 1];
        var s, a = new md(t);
        for (i = 0; i < t; ++i) a[i] = a[i - 1] + o[i - 1] << 1;
        if (n) {
            s = new md(1 << t);
            var l = 15 - t;
            for (i = 0; i < r; ++i)
                if (e[i])
                    for (var c = i << 4 | e[i], u = t - e[i], d = a[e[i] - 1]++ << u, h = d | (1 << u) - 1; d <= h; ++d) s[xd[d] >>> l] = c
        } else
            for (s = new md(r), i = 0; i < r; ++i) s[i] = xd[a[e[i] - 1]++] >>> 15 - e[i];
        return s
    },
    Ad = new fd(288);
for (Td = 0; Td < 144; ++Td) Ad[Td] = 8;
for (Td = 144; Td < 256; ++Td) Ad[Td] = 9;
for (Td = 256; Td < 280; ++Td) Ad[Td] = 7;
for (Td = 280; Td < 288; ++Td) Ad[Td] = 8;
var Nd = new fd(32);
for (Td = 0; Td < 32; ++Td) Nd[Td] = 5;
var Fd = Rd(Ad, 9, 0),
    Od = Rd(Nd, 5, 0),
    Pd = function(e) {
        return (e / 8 >> 0) + (7 & e && 1)
    },
    Ld = function(e, t, n) {
        (null == n || n > e.length) && (n = e.length);
        var r = new(e instanceof md ? md : e instanceof _d ? _d : fd)(n - t);
        return r.set(e.subarray(t, n)), r
    },
    Dd = function(e, t, n) {
        n <<= 7 & t;
        var r = t / 8 >> 0;
        e[r] |= n, e[r + 1] |= n >>> 8
    },
    Bd = function(e, t, n) {
        n <<= 7 & t;
        var r = t / 8 >> 0;
        e[r] |= n, e[r + 1] |= n >>> 8, e[r + 2] |= n >>> 16
    },
    qd = function(e, t) {
        for (var n = [], r = 0; r < e.length; ++r) e[r] && n.push({
            s: r,
            f: e[r]
        });
        var i = n.length,
            o = n.slice();
        if (!i) return [new fd(0), 0];
        if (1 == i) {
            var s = new fd(n[0].s + 1);
            return s[n[0].s] = 1, [s, 1]
        }
        n.sort((function(e, t) {
            return e.f - t.f
        })), n.push({
            s: -1,
            f: 25001
        });
        var a = n[0],
            l = n[1],
            c = 0,
            u = 1,
            d = 2;
        for (n[0] = {
                s: -1,
                f: a.f + l.f,
                l: a,
                r: l
            }; u != i - 1;) a = n[n[c].f < n[d].f ? c++ : d++], l = n[c != u && n[c].f < n[d].f ? c++ : d++], n[u++] = {
            s: -1,
            f: a.f + l.f,
            l: a,
            r: l
        };
        var h = o[0].s;
        for (r = 1; r < i; ++r) o[r].s > h && (h = o[r].s);
        var p = new md(h + 1),
            v = Hd(n[u - 1], p, 0);
        if (v > t) {
            r = 0;
            var g = 0,
                f = v - t,
                m = 1 << f;
            for (o.sort((function(e, t) {
                    return p[t.s] - p[e.s] || e.f - t.f
                })); r < i; ++r) {
                var _ = o[r].s;
                if (!(p[_] > t)) break;
                g += m - (1 << v - p[_]), p[_] = t
            }
            for (g >>>= f; g > 0;) {
                var y = o[r].s;
                p[y] < t ? g -= 1 << t - p[y]++ - 1 : ++r
            }
            for (; r >= 0 && g; --r) {
                var b = o[r].s;
                p[b] == t && (--p[b], ++g)
            }
            v = t
        }
        return [new fd(p), v]
    },
    Hd = function(e, t, n) {
        return -1 == e.s ? Math.max(Hd(e.l, t, n + 1), Hd(e.r, t, n + 1)) : t[e.s] = n
    },
    $d = function(e) {
        for (var t = e.length; t && !e[--t];);
        for (var n = new md(++t), r = 0, i = e[0], o = 1, s = function(e) {
                n[r++] = e
            }, a = 1; a <= t; ++a)
            if (e[a] == i && a != t) ++o;
            else {
                if (!i && o > 2) {
                    for (; o > 138; o -= 138) s(32754);
                    o > 2 && (s(o > 10 ? o - 11 << 5 | 28690 : o - 3 << 5 | 12305), o = 0)
                } else if (o > 3) {
                    for (s(i), --o; o > 6; o -= 6) s(8304);
                    o > 2 && (s(o - 3 << 5 | 8208), o = 0)
                }
                for (; o--;) s(i);
                o = 1, i = e[a]
            } return [n.subarray(0, r), t]
    },
    Wd = function(e, t) {
        for (var n = 0, r = 0; r < t.length; ++r) n += e[r] * t[r];
        return n
    },
    Vd = function(e, t, n) {
        var r = n.length,
            i = Pd(t + 2);
        e[i] = 255 & r, e[i + 1] = r >>> 8, e[i + 2] = 255 ^ e[i], e[i + 3] = 255 ^ e[i + 1];
        for (var o = 0; o < r; ++o) e[i + o + 4] = n[o];
        return 8 * (i + 4 + r)
    },
    Zd = function(e, t, n, r, i, o, s, a, l, c, u) {
        Dd(t, u++, n), ++i[256];
        for (var d = qd(i, 15), h = d[0], p = d[1], v = qd(o, 15), g = v[0], f = v[1], m = $d(h), _ = m[0], y = m[1], b = $d(g), w = b[0], S = b[1], C = new md(19), I = 0; I < _.length; ++I) C[31 & _[I]]++;
        for (I = 0; I < w.length; ++I) C[31 & w[I]]++;
        for (var k = qd(C, 7), E = k[0], x = k[1], T = 19; T > 4 && !E[wd[T - 1]]; --T);
        var M, R, A, N, F = c + 5 << 3,
            O = Wd(i, Ad) + Wd(o, Nd) + s,
            P = Wd(i, h) + Wd(o, g) + s + 14 + 3 * T + Wd(C, E) + (2 * C[16] + 3 * C[17] + 7 * C[18]);
        if (F <= O && F <= P) return Vd(t, u, e.subarray(l, l + c));
        if (Dd(t, u, 1 + (P < O)), u += 2, P < O) {
            M = Rd(h, p, 0), R = h, A = Rd(g, f, 0), N = g;
            var L = Rd(E, x, 0);
            Dd(t, u, y - 257), Dd(t, u + 5, S - 1), Dd(t, u + 10, T - 4), u += 14;
            for (I = 0; I < T; ++I) Dd(t, u + 3 * I, E[wd[I]]);
            u += 3 * T;
            for (var D = [_, w], B = 0; B < 2; ++B) {
                var q = D[B];
                for (I = 0; I < q.length; ++I) {
                    var H = 31 & q[I];
                    Dd(t, u, L[H]), u += E[H], H > 15 && (Dd(t, u, q[I] >>> 5 & 127), u += q[I] >>> 12)
                }
            }
        } else M = Fd, R = Ad, A = Od, N = Nd;
        for (I = 0; I < a; ++I)
            if (r[I] > 255) {
                H = r[I] >>> 18 & 31;
                Bd(t, u, M[H + 257]), u += R[H + 257], H > 7 && (Dd(t, u, r[I] >>> 23 & 31), u += yd[H]);
                var $ = 31 & r[I];
                Bd(t, u, A[$]), u += N[$], $ > 3 && (Bd(t, u, r[I] >>> 5 & 8191), u += bd[$])
            } else Bd(t, u, M[r[I]]), u += R[r[I]];
        return Bd(t, u, M[256]), u + R[256]
    },
    Gd = new _d([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]),
    Ud = function() {
        for (var e = new _d(256), t = 0; t < 256; ++t) {
            for (var n = t, r = 9; --r;) n = (1 & n && 3988292384) ^ n >>> 1;
            e[t] = n
        }
        return e
    }(),
    jd = function() {
        var e = 4294967295;
        return {
            p: function(t) {
                for (var n = e, r = 0; r < t.length; ++r) n = Ud[255 & n ^ t[r]] ^ n >>> 8;
                e = n
            },
            d: function() {
                return 4294967295 ^ e
            }
        }
    },
    zd = function(e, t, n, r, i) {
        return function(e, t, n, r, i, o) {
            var s = e.length,
                a = new fd(r + s + 5 * (1 + Math.floor(s / 7e3)) + i),
                l = a.subarray(r, a.length - i),
                c = 0;
            if (!t || s < 8)
                for (var u = 0; u <= s; u += 65535) {
                    var d = u + 65535;
                    d < s ? c = Vd(l, c, e.subarray(u, d)) : (l[u] = o, c = Vd(l, c, e.subarray(u, s)))
                } else {
                    for (var h = Gd[t - 1], p = h >>> 13, v = 8191 & h, g = (1 << n) - 1, f = new md(32768), m = new md(g + 1), _ = Math.ceil(n / 3), y = 2 * _, b = function(t) {
                            return (e[t] ^ e[t + 1] << _ ^ e[t + 2] << y) & g
                        }, w = new _d(25e3), S = new md(288), C = new md(32), I = 0, k = 0, E = (u = 0, 0), x = 0, T = 0; u < s; ++u) {
                        var M = b(u),
                            R = 32767 & u,
                            A = m[M];
                        if (f[R] = A, m[M] = R, x <= u) {
                            var N = s - u;
                            if ((I > 7e3 || E > 24576) && N > 423) {
                                c = Zd(e, l, 0, w, S, C, k, E, T, u - T, c), E = I = k = 0, T = u;
                                for (var F = 0; F < 286; ++F) S[F] = 0;
                                for (F = 0; F < 30; ++F) C[F] = 0
                            }
                            var O = 2,
                                P = 0,
                                L = v,
                                D = R - A & 32767;
                            if (N > 2 && M == b(u - D))
                                for (var B = Math.min(p, N) - 1, q = Math.min(32767, u), H = Math.min(258, N); D <= q && --L && R != A;) {
                                    if (e[u + O] == e[u + O - D]) {
                                        for (var $ = 0; $ < H && e[u + $] == e[u + $ - D]; ++$);
                                        if ($ > O) {
                                            if (O = $, P = D, $ > B) break;
                                            var W = Math.min(D, $ - 2),
                                                V = 0;
                                            for (F = 0; F < W; ++F) {
                                                var Z = u - D + F + 32768 & 32767,
                                                    G = Z - f[Z] + 32768 & 32767;
                                                G > V && (V = G, A = Z)
                                            }
                                        }
                                    }
                                    D += (R = A) - (A = f[R]) + 32768 & 32767
                                }
                            if (P) {
                                w[E++] = 268435456 | kd[O] << 18 | Ed[P];
                                var U = 31 & kd[O],
                                    j = 31 & Ed[P];
                                k += yd[U] + bd[j], ++S[257 + U], ++C[j], x = u + O, ++I
                            } else w[E++] = e[u], ++S[e[u]]
                        }
                    }
                    c = Zd(e, l, o, w, S, C, k, E, T, u - T, c)
                }
            return Ld(a, 0, r + Pd(c) + i)
        }(e, null == t.level ? 6 : t.level, null == t.mem ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(e.length)))) : 12 + t.mem, n, r, !i)
    },
    Yd = function(e, t, n) {
        for (; n; ++t) e[t] = n, n >>>= 8
    },
    Xd = function(e, t) {
        var n = t.filename;
        if (e[0] = 31, e[1] = 139, e[2] = 8, e[8] = t.level < 2 ? 4 : 9 == t.level ? 2 : 0, e[9] = 3, 0 != t.mtime && Yd(e, 4, Math.floor(new Date(t.mtime || Date.now()) / 1e3)), n) {
            e[3] = 8;
            for (var r = 0; r <= n.length; ++r) e[r + 10] = n.charCodeAt(r)
        }
    },
    Jd = function(e) {
        return 10 + (e.filename && e.filename.length + 1 || 0)
    };

function Kd(e, t) {
    void 0 === t && (t = {});
    var n = jd(),
        r = e.length;
    n.p(e);
    var i = zd(e, t, Jd(t), 8),
        o = i.length;
    return Xd(i, t), Yd(i, o - 8, n.d()), Yd(i, o - 4, r), i
}

function Qd(e, t) {
    var n = e.length;
    if ("undefined" != typeof TextEncoder) return (new TextEncoder).encode(e);
    for (var r = new fd(e.length + (e.length >>> 1)), i = 0, o = function(e) {
            r[i++] = e
        }, s = 0; s < n; ++s) {
        if (i + 5 > r.length) {
            var a = new fd(i + 8 + (n - s << 1));
            a.set(r), r = a
        }
        var l = e.charCodeAt(s);
        l < 128 || t ? o(l) : l < 2048 ? (o(192 | l >>> 6), o(128 | 63 & l)) : l > 55295 && l < 57344 ? (o(240 | (l = 65536 + (1047552 & l) | 1023 & e.charCodeAt(++s)) >>> 18), o(128 | l >>> 12 & 63), o(128 | l >>> 6 & 63), o(128 | 63 & l)) : (o(224 | l >>> 12), o(128 | l >>> 6 & 63), o(128 | 63 & l))
    }
    return Ld(r, 0, i)
}
var eh = "[SessionRecording]",
    th = Ar(eh),
    nh = 3e5,
    rh = [pd.MouseMove, pd.MouseInteraction, pd.Scroll, pd.ViewportResize, pd.Input, pd.TouchMove, pd.MediaInteraction, pd.Drag],
    ih = e => ({
        rrwebMethod: e,
        enqueuedAt: Date.now(),
        attempt: 1
    });

function oh(e) {
    return function(e, t) {
        for (var n = "", r = 0; r < e.length;) {
            var i = e[r++];
            i < 128 || t ? n += String.fromCharCode(i) : i < 224 ? n += String.fromCharCode((31 & i) << 6 | 63 & e[r++]) : i < 240 ? n += String.fromCharCode((15 & i) << 12 | (63 & e[r++]) << 6 | 63 & e[r++]) : (i = ((15 & i) << 18 | (63 & e[r++]) << 12 | (63 & e[r++]) << 6 | 63 & e[r++]) - 65536, n += String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i))
        }
        return n
    }(Kd(Qd(JSON.stringify(e))), !0)
}

function sh(e) {
    return e.type === hd.Custom && "sessionIdle" === e.data.tag
}

function ah(e, t) {
    return t.some((t => "regex" === t.matching && new RegExp(t.url).test(e)))
}
class lh {
    get sessionIdleThresholdMilliseconds() {
        return this.instance.config.session_recording.session_idle_threshold_ms || 3e5
    }
    get rrwebRecord() {
        var e, t;
        return null == tr || null === (e = tr.__PosthogExtensions__) || void 0 === e || null === (t = e.rrweb) || void 0 === t ? void 0 : t.record
    }
    get started() {
        return this._captureStarted
    }
    get sessionManager() {
        if (!this.instance.sessionManager) throw new Error(eh + " must be started with a valid sessionManager.");
        return this.instance.sessionManager
    }
    get fullSnapshotIntervalMillis() {
        var e, t;
        return "trigger_pending" === this.triggerStatus ? 6e4 : null !== (e = null === (t = this.instance.config.session_recording) || void 0 === t ? void 0 : t.full_snapshot_interval_millis) && void 0 !== e ? e : nh
    }
    get isSampled() {
        var e = this.instance.get_property(vi);
        return Ir(e) ? e : null
    }
    get sessionDuration() {
        var e, t, n = null === (e = this.buffer) || void 0 === e ? void 0 : e.data[(null === (t = this.buffer) || void 0 === t ? void 0 : t.data.length) - 1],
            {
                sessionStartTimestamp: r
            } = this.sessionManager.checkAndGetSessionAndWindowId(!0);
        return n ? n.timestamp - r : null
    }
    get isRecordingEnabled() {
        var e = !!this.instance.get_property(si),
            t = !this.instance.config.disable_session_recording;
        return Vn && e && t
    }
    get isConsoleLogCaptureEnabled() {
        var e = !!this.instance.get_property(ai),
            t = this.instance.config.enable_recording_console_log;
        return null != t ? t : e
    }
    get canvasRecording() {
        var e, t, n, r, i, o, s = this.instance.config.session_recording.captureCanvas,
            a = this.instance.get_property(ci),
            l = null !== (e = null !== (t = null == s ? void 0 : s.recordCanvas) && void 0 !== t ? t : null == a ? void 0 : a.enabled) && void 0 !== e && e,
            c = null !== (n = null !== (r = null == s ? void 0 : s.canvasFps) && void 0 !== r ? r : null == a ? void 0 : a.fps) && void 0 !== n ? n : 0,
            u = null !== (i = null !== (o = null == s ? void 0 : s.canvasQuality) && void 0 !== o ? o : null == a ? void 0 : a.quality) && void 0 !== i ? i : 0;
        return {
            enabled: l,
            fps: vd(c, 0, 12, "canvas recording fps"),
            quality: vd(u, 0, 1, "canvas recording quality")
        }
    }
    get networkPayloadCapture() {
        var e, t, n = this.instance.get_property(li),
            r = {
                recordHeaders: null === (e = this.instance.config.session_recording) || void 0 === e ? void 0 : e.recordHeaders,
                recordBody: null === (t = this.instance.config.session_recording) || void 0 === t ? void 0 : t.recordBody
            },
            i = (null == r ? void 0 : r.recordHeaders) || (null == n ? void 0 : n.recordHeaders),
            o = (null == r ? void 0 : r.recordBody) || (null == n ? void 0 : n.recordBody),
            s = fr(this.instance.config.capture_performance) ? this.instance.config.capture_performance.network_timing : this.instance.config.capture_performance,
            a = !!(Ir(s) ? s : null == n ? void 0 : n.capturePerformance);
        return i || o || a ? {
            recordHeaders: i,
            recordBody: o,
            recordPerformance: a
        } : void 0
    }
    get sampleRate() {
        var e = this.instance.get_property(ui);
        return Cr(e) ? e : null
    }
    get minimumDuration() {
        var e = this.instance.get_property(di);
        return Cr(e) ? e : null
    }
    get status() {
        return this.receivedDecide ? this.isRecordingEnabled ? this._urlBlocked ? "paused" : Sr(this._linkedFlag) || this._linkedFlagSeen ? "trigger_pending" === this.triggerStatus ? "buffering" : Ir(this.isSampled) ? this.isSampled ? "sampled" : "disabled" : "active" : "buffering" : "disabled" : "buffering"
    }
    get urlTriggerStatus() {
        var e;
        return 0 === this._urlTriggers.length ? "trigger_disabled" : (null === (e = this.instance) || void 0 === e ? void 0 : e.get_property(gi)) === this.sessionId ? "trigger_activated" : "trigger_pending"
    }
    get eventTriggerStatus() {
        var e;
        return 0 === this._eventTriggers.length ? "trigger_disabled" : (null === (e = this.instance) || void 0 === e ? void 0 : e.get_property(fi)) === this.sessionId ? "trigger_activated" : "trigger_pending"
    }
    get triggerStatus() {
        var e = "trigger_activated" === this.eventTriggerStatus || "trigger_activated" === this.urlTriggerStatus,
            t = "trigger_pending" === this.eventTriggerStatus || "trigger_pending" === this.urlTriggerStatus;
        return e ? "trigger_activated" : t ? "trigger_pending" : "trigger_disabled"
    }
    constructor(e) {
        if (i(this, "queuedRRWebEvents", []), i(this, "isIdle", !1), i(this, "_linkedFlagSeen", !1), i(this, "_lastActivityTimestamp", Date.now()), i(this, "_linkedFlag", null), i(this, "_removePageViewCaptureHook", void 0), i(this, "_onSessionIdListener", void 0), i(this, "_persistDecideOnSessionListener", void 0), i(this, "_samplingSessionListener", void 0), i(this, "_urlTriggers", []), i(this, "_urlBlocklist", []), i(this, "_urlBlocked", !1), i(this, "_eventTriggers", []), i(this, "_removeEventTriggerCaptureHook", void 0), i(this, "_forceAllowLocalhostNetworkCapture", !1), i(this, "_onBeforeUnload", (() => {
                this._flushBuffer()
            })), i(this, "_onOffline", (() => {
                this._tryAddCustomEvent("browser offline", {})
            })), i(this, "_onOnline", (() => {
                this._tryAddCustomEvent("browser online", {})
            })), i(this, "_onVisibilityChange", (() => {
                if (null != Yn && Yn.visibilityState) {
                    var e = "window " + Yn.visibilityState;
                    this._tryAddCustomEvent(e, {})
                }
            })), this.instance = e, this._captureStarted = !1, this._endpoint = "/s/", this.stopRrweb = void 0, this.receivedDecide = !1, !this.instance.sessionManager) throw th.error("started without valid sessionManager"), new Error(eh + " started without valid sessionManager. This is a bug.");
        if (this.instance.config.__preview_experimental_cookieless_mode) throw new Error(eh + " cannot be used with __preview_experimental_cookieless_mode.");
        var {
            sessionId: t,
            windowId: n
        } = this.sessionManager.checkAndGetSessionAndWindowId();
        this.sessionId = t, this.windowId = n, this.buffer = this.clearBuffer(), this.sessionIdleThresholdMilliseconds >= this.sessionManager.sessionTimeoutMs && th.warn("session_idle_threshold_ms (".concat(this.sessionIdleThresholdMilliseconds, ") is greater than the session timeout (").concat(this.sessionManager.sessionTimeoutMs, "). Session will never be detected as idle"))
    }
    startIfEnabledOrStop(e) {
        this.isRecordingEnabled ? (this._startCapture(e), null == Vn || Vn.addEventListener("beforeunload", this._onBeforeUnload), null == Vn || Vn.addEventListener("offline", this._onOffline), null == Vn || Vn.addEventListener("online", this._onOnline), null == Vn || Vn.addEventListener("visibilitychange", this._onVisibilityChange), this._setupSampling(), this._addEventTriggerListener(), Sr(this._removePageViewCaptureHook) && (this._removePageViewCaptureHook = this.instance.on("eventCaptured", (e => {
            try {
                if ("$pageview" === e.event) {
                    var t = null != e && e.properties.$current_url ? this._maskUrl(null == e ? void 0 : e.properties.$current_url) : "";
                    if (!t) return;
                    this._tryAddCustomEvent("$pageview", {
                        href: t
                    })
                }
            } catch (e) {
                th.error("Could not add $pageview to rrweb session", e)
            }
        }))), this._onSessionIdListener || (this._onSessionIdListener = this.sessionManager.onSessionId(((e, t, n) => {
            var r, i, o, s;
            n && (this._tryAddCustomEvent("$session_id_change", {
                sessionId: e,
                windowId: t,
                changeReason: n
            }), null === (r = this.instance) || void 0 === r || null === (i = r.persistence) || void 0 === i || i.unregister(fi), null === (o = this.instance) || void 0 === o || null === (s = o.persistence) || void 0 === s || s.unregister(gi))
        })))) : this.stopRecording()
    }
    stopRecording() {
        var e, t, n, r;
        this._captureStarted && this.stopRrweb && (this.stopRrweb(), this.stopRrweb = void 0, this._captureStarted = !1, null == Vn || Vn.removeEventListener("beforeunload", this._onBeforeUnload), null == Vn || Vn.removeEventListener("offline", this._onOffline), null == Vn || Vn.removeEventListener("online", this._onOnline), null == Vn || Vn.removeEventListener("visibilitychange", this._onVisibilityChange), this.clearBuffer(), clearInterval(this._fullSnapshotTimer), null === (e = this._removePageViewCaptureHook) || void 0 === e || e.call(this), this._removePageViewCaptureHook = void 0, null === (t = this._removeEventTriggerCaptureHook) || void 0 === t || t.call(this), this._removeEventTriggerCaptureHook = void 0, null === (n = this._onSessionIdListener) || void 0 === n || n.call(this), this._onSessionIdListener = void 0, null === (r = this._samplingSessionListener) || void 0 === r || r.call(this), this._samplingSessionListener = void 0, th.info("stopped"))
    }
    makeSamplingDecision(e) {
        var t, n = this.sessionId !== e,
            r = this.sampleRate;
        if (Cr(r)) {
            var i, o = this.isSampled,
                s = n || !Ir(o);
            if (s) i = Math.random() < r;
            else i = o;
            s && (i ? this._reportStarted("sampled") : th.warn("Sample rate (".concat(r, ") has determined that this sessionId (").concat(e, ") will not be sent to the server.")), this._tryAddCustomEvent("samplingDecisionMade", {
                sampleRate: r,
                isSampled: i
            })), null === (t = this.instance.persistence) || void 0 === t || t.register({
                [vi]: i
            })
        } else {
            var a;
            null === (a = this.instance.persistence) || void 0 === a || a.register({
                [vi]: null
            })
        }
    }
    onRemoteConfig(e) {
        var t, n, r, i, o, s;
        (this._tryAddCustomEvent("$remote_config_received", e), this._persistRemoteConfig(e), this._linkedFlag = (null === (t = e.sessionRecording) || void 0 === t ? void 0 : t.linkedFlag) || null, null !== (n = e.sessionRecording) && void 0 !== n && n.endpoint) && (this._endpoint = null === (s = e.sessionRecording) || void 0 === s ? void 0 : s.endpoint);
        if (this._setupSampling(), !Sr(this._linkedFlag) && !this._linkedFlagSeen) {
            var a = yr(this._linkedFlag) ? this._linkedFlag : this._linkedFlag.flag,
                l = yr(this._linkedFlag) ? null : this._linkedFlag.variant;
            this.instance.onFeatureFlags(((e, t) => {
                var n = fr(t) && a in t,
                    r = l ? t[a] === l : n;
                r && this._reportStarted("linked_flag_matched", {
                    linkedFlag: a,
                    linkedVariant: l
                }), this._linkedFlagSeen = r
            }))
        }
        null !== (r = e.sessionRecording) && void 0 !== r && r.urlTriggers && (this._urlTriggers = e.sessionRecording.urlTriggers), null !== (i = e.sessionRecording) && void 0 !== i && i.urlBlocklist && (this._urlBlocklist = e.sessionRecording.urlBlocklist), null !== (o = e.sessionRecording) && void 0 !== o && o.eventTriggers && (this._eventTriggers = e.sessionRecording.eventTriggers), this.receivedDecide = !0, this.startIfEnabledOrStop()
    }
    _setupSampling() {
        Cr(this.sampleRate) && Sr(this._samplingSessionListener) && (this._samplingSessionListener = this.sessionManager.onSessionId((e => {
            this.makeSamplingDecision(e)
        })))
    }
    _persistRemoteConfig(e) {
        if (this.instance.persistence) {
            var n, r = this.instance.persistence,
                i = () => {
                    var n, i, o, s, a, l, c, u, d = null === (n = e.sessionRecording) || void 0 === n ? void 0 : n.sampleRate,
                        h = Sr(d) ? null : parseFloat(d),
                        p = null === (i = e.sessionRecording) || void 0 === i ? void 0 : i.minimumDurationMilliseconds;
                    r.register({
                        [si]: !!e.sessionRecording,
                        [ai]: null === (o = e.sessionRecording) || void 0 === o ? void 0 : o.consoleLogRecordingEnabled,
                        [li]: t({
                            capturePerformance: e.capturePerformance
                        }, null === (s = e.sessionRecording) || void 0 === s ? void 0 : s.networkPayloadCapture),
                        [ci]: {
                            enabled: null === (a = e.sessionRecording) || void 0 === a ? void 0 : a.recordCanvas,
                            fps: null === (l = e.sessionRecording) || void 0 === l ? void 0 : l.canvasFps,
                            quality: null === (c = e.sessionRecording) || void 0 === c ? void 0 : c.canvasQuality
                        },
                        [ui]: h,
                        [di]: _r(p) ? null : p,
                        [hi]: null === (u = e.sessionRecording) || void 0 === u ? void 0 : u.scriptConfig
                    })
                };
            i(), null === (n = this._persistDecideOnSessionListener) || void 0 === n || n.call(this), this._persistDecideOnSessionListener = this.sessionManager.onSessionId(i)
        }
    }
    log(e) {
        var t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "log";
        null === (t = this.instance.sessionRecording) || void 0 === t || t.onRRwebEmit({
            type: 6,
            data: {
                plugin: "rrweb/console@1",
                payload: {
                    level: n,
                    trace: [],
                    payload: [JSON.stringify(e)]
                }
            },
            timestamp: Date.now()
        })
    }
    _startCapture(e) {
        if (!_r(Object.assign) && !_r(Array.from) && !(this._captureStarted || this.instance.config.disable_session_recording || this.instance.consent.isOptedOut())) {
            var t, n;
            if (this._captureStarted = !0, this.sessionManager.checkAndGetSessionAndWindowId(), this.rrwebRecord) this._onScriptLoaded();
            else null === (t = tr.__PosthogExtensions__) || void 0 === t || null === (n = t.loadExternalDependency) || void 0 === n || n.call(t, this.instance, this.scriptName, (e => {
                if (e) return th.error("could not load recorder", e);
                this._onScriptLoaded()
            }));
            th.info("starting"), "active" === this.status && this._reportStarted(e || "recording_initialized")
        }
    }
    get scriptName() {
        var e, t, n;
        return (null === (e = this.instance) || void 0 === e || null === (t = e.persistence) || void 0 === t || null === (n = t.get_property(hi)) || void 0 === n ? void 0 : n.script) || "recorder"
    }
    isInteractiveEvent(e) {
        var t;
        return 3 === e.type && -1 !== rh.indexOf(null === (t = e.data) || void 0 === t ? void 0 : t.source)
    }
    _updateWindowAndSessionIds(e) {
        var t = this.isInteractiveEvent(e);
        t || this.isIdle || e.timestamp - this._lastActivityTimestamp > this.sessionIdleThresholdMilliseconds && (this.isIdle = !0, clearInterval(this._fullSnapshotTimer), this._tryAddCustomEvent("sessionIdle", {
            eventTimestamp: e.timestamp,
            lastActivityTimestamp: this._lastActivityTimestamp,
            threshold: this.sessionIdleThresholdMilliseconds,
            bufferLength: this.buffer.data.length,
            bufferSize: this.buffer.size
        }), this._flushBuffer());
        var n = !1;
        if (t && (this._lastActivityTimestamp = e.timestamp, this.isIdle && (this.isIdle = !1, this._tryAddCustomEvent("sessionNoLongerIdle", {
                reason: "user activity",
                type: e.type
            }), n = !0)), !this.isIdle) {
            var {
                windowId: r,
                sessionId: i
            } = this.sessionManager.checkAndGetSessionAndWindowId(!t, e.timestamp), o = this.sessionId !== i, s = this.windowId !== r;
            this.windowId = r, this.sessionId = i, o || s ? (this.stopRecording(), this.startIfEnabledOrStop("session_id_changed")) : n && this._scheduleFullSnapshot()
        }
    }
    _tryRRWebMethod(e) {
        try {
            return e.rrwebMethod(), !0
        } catch (t) {
            return this.queuedRRWebEvents.length < 10 ? this.queuedRRWebEvents.push({
                enqueuedAt: e.enqueuedAt || Date.now(),
                attempt: e.attempt++,
                rrwebMethod: e.rrwebMethod
            }) : th.warn("could not emit queued rrweb event.", t, e), !1
        }
    }
    _tryAddCustomEvent(e, t) {
        return this._tryRRWebMethod(ih((() => this.rrwebRecord.addCustomEvent(e, t))))
    }
    _tryTakeFullSnapshot() {
        return this._tryRRWebMethod(ih((() => this.rrwebRecord.takeFullSnapshot())))
    }
    _onScriptLoaded() {
        var e, n = {
                blockClass: "ph-no-capture",
                blockSelector: void 0,
                ignoreClass: "ph-ignore-input",
                maskTextClass: "ph-mask",
                maskTextSelector: void 0,
                maskTextFn: void 0,
                maskAllInputs: !0,
                maskInputOptions: {
                    password: !0
                },
                maskInputFn: void 0,
                slimDOMOptions: {},
                collectFonts: !1,
                inlineStylesheet: !0,
                recordCrossOriginIframes: !1
            },
            r = this.instance.config.session_recording;
        for (var [i, o] of Object.entries(r || {})) i in n && ("maskInputOptions" === i ? n.maskInputOptions = t({
            password: !0
        }, o) : n[i] = o);
        if (this.canvasRecording && this.canvasRecording.enabled && (n.recordCanvas = !0, n.sampling = {
                canvas: this.canvasRecording.fps
            }, n.dataURLOptions = {
                type: "image/webp",
                quality: this.canvasRecording.quality
            }), this.rrwebRecord) {
            this.mutationRateLimiter = null !== (e = this.mutationRateLimiter) && void 0 !== e ? e : new gd(this.rrwebRecord, {
                refillRate: this.instance.config.session_recording.__mutationRateLimiterRefillRate,
                bucketSize: this.instance.config.session_recording.__mutationRateLimiterBucketSize,
                onBlockedNode: (e, t) => {
                    var n = "Too many mutations on node '".concat(e, "'. Rate limiting. This could be due to SVG animations or something similar");
                    th.info(n, {
                        node: t
                    }), this.log(eh + " " + n, "warn")
                }
            });
            var s = this._gatherRRWebPlugins();
            this.stopRrweb = this.rrwebRecord(t({
                emit: e => {
                    this.onRRwebEmit(e)
                },
                plugins: s
            }, n)), this._lastActivityTimestamp = Date.now(), this.isIdle = !1, this._tryAddCustomEvent("$session_options", {
                sessionRecordingOptions: n,
                activePlugins: s.map((e => null == e ? void 0 : e.name))
            }), this._tryAddCustomEvent("$posthog_config", {
                config: this.instance.config
            })
        } else th.error("onScriptLoaded was called but rrwebRecord is not available. This indicates something has gone wrong.")
    }
    _scheduleFullSnapshot() {
        if (this._fullSnapshotTimer && clearInterval(this._fullSnapshotTimer), !this.isIdle) {
            var e = this.fullSnapshotIntervalMillis;
            e && (this._fullSnapshotTimer = setInterval((() => {
                this._tryTakeFullSnapshot()
            }), e))
        }
    }
    _gatherRRWebPlugins() {
        var e, t, n, r, i = [],
            o = null === (e = tr.__PosthogExtensions__) || void 0 === e || null === (t = e.rrwebPlugins) || void 0 === t ? void 0 : t.getRecordConsolePlugin;
        o && this.isConsoleLogCaptureEnabled && i.push(o());
        var s = null === (n = tr.__PosthogExtensions__) || void 0 === n || null === (r = n.rrwebPlugins) || void 0 === r ? void 0 : r.getRecordNetworkPlugin;
        this.networkPayloadCapture && pr(s) && (!Zr.includes(location.hostname) || this._forceAllowLocalhostNetworkCapture ? i.push(s(mo(this.instance.config, this.networkPayloadCapture))) : th.info("NetworkCapture not started because we are on localhost."));
        return i
    }
    onRRwebEmit(e) {
        var n;
        if (this._processQueuedEvents(), e && fr(e)) {
            if (e.type === hd.Meta) {
                var r = this._maskUrl(e.data.href);
                if (this._lastHref = r, !r) return;
                e.data.href = r
            } else this._pageViewFallBack();
            if (this._checkUrlTriggerConditions(), "paused" !== this.status || function(e) {
                    return e.type === hd.Custom && "recording paused" === e.data.tag
                }(e)) {
                e.type === hd.FullSnapshot && this._scheduleFullSnapshot(), e.type === hd.FullSnapshot && "trigger_pending" === this.triggerStatus && this.clearBuffer();
                var i = this.mutationRateLimiter ? this.mutationRateLimiter.throttleMutations(e) : e;
                if (i) {
                    var o = function(e) {
                        var t = e;
                        if (t && fr(t) && 6 === t.type && fr(t.data) && "rrweb/console@1" === t.data.plugin) {
                            t.data.payload.payload.length > 10 && (t.data.payload.payload = t.data.payload.payload.slice(0, 10), t.data.payload.payload.push("...[truncated]"));
                            for (var n = [], r = 0; r < t.data.payload.payload.length; r++) t.data.payload.payload[r] && t.data.payload.payload[r].length > 2e3 ? n.push(t.data.payload.payload[r].slice(0, 2e3) + "...[truncated]") : n.push(t.data.payload.payload[r]);
                            return t.data.payload.payload = n, e
                        }
                        return e
                    }(i);
                    if (this._updateWindowAndSessionIds(o), !this.isIdle || sh(o)) {
                        if (sh(o)) {
                            var s = o.data.payload;
                            if (s) {
                                var a = s.lastActivityTimestamp,
                                    l = s.threshold;
                                o.timestamp = a + l
                            }
                        }
                        var c = null === (n = this.instance.config.session_recording.compress_events) || void 0 === n || n ? function(e) {
                                if (ud(e) < 1024) return e;
                                try {
                                    if (e.type === hd.FullSnapshot) return t(t({}, e), {}, {
                                        data: oh(e.data),
                                        cv: "2024-10"
                                    });
                                    if (e.type === hd.IncrementalSnapshot && e.data.source === pd.Mutation) return t(t({}, e), {}, {
                                        cv: "2024-10",
                                        data: t(t({}, e.data), {}, {
                                            texts: oh(e.data.texts),
                                            attributes: oh(e.data.attributes),
                                            removes: oh(e.data.removes),
                                            adds: oh(e.data.adds)
                                        })
                                    });
                                    if (e.type === hd.IncrementalSnapshot && e.data.source === pd.StyleSheetRule) return t(t({}, e), {}, {
                                        cv: "2024-10",
                                        data: t(t({}, e.data), {}, {
                                            adds: oh(e.data.adds),
                                            removes: oh(e.data.removes)
                                        })
                                    })
                                } catch (e) {
                                    th.error("could not compress event - will use uncompressed event", e)
                                }
                                return e
                            }(o) : o,
                            u = {
                                $snapshot_bytes: ud(c),
                                $snapshot_data: c,
                                $session_id: this.sessionId,
                                $window_id: this.windowId
                            };
                        "disabled" !== this.status ? this._captureSnapshotBuffered(u) : this.clearBuffer()
                    }
                }
            }
        }
    }
    _pageViewFallBack() {
        if (!this.instance.config.capture_pageview && Vn) {
            var e = this._maskUrl(Vn.location.href);
            this._lastHref !== e && (this._tryAddCustomEvent("$url_changed", {
                href: e
            }), this._lastHref = e)
        }
    }
    _processQueuedEvents() {
        if (this.queuedRRWebEvents.length) {
            var e = [...this.queuedRRWebEvents];
            this.queuedRRWebEvents = [], e.forEach((e => {
                Date.now() - e.enqueuedAt <= 2e3 && this._tryRRWebMethod(e)
            }))
        }
    }
    _maskUrl(e) {
        var t = this.instance.config.session_recording;
        if (t.maskNetworkRequestFn) {
            var n, r = {
                url: e
            };
            return null === (n = r = t.maskNetworkRequestFn(r)) || void 0 === n ? void 0 : n.url
        }
        return e
    }
    clearBuffer() {
        return this.buffer = {
            size: 0,
            data: [],
            sessionId: this.sessionId,
            windowId: this.windowId
        }, this.buffer
    }
    _flushBuffer() {
        this.flushBufferTimer && (clearTimeout(this.flushBufferTimer), this.flushBufferTimer = void 0);
        var e = this.minimumDuration,
            t = this.sessionDuration,
            n = Cr(t) && t >= 0,
            r = Cr(e) && n && t < e;
        if ("buffering" === this.status || "paused" === this.status || r) return this.flushBufferTimer = setTimeout((() => {
            this._flushBuffer()
        }), 2e3), this.buffer;
        this.buffer.data.length > 0 && dd(this.buffer).forEach((e => {
            this._captureSnapshot({
                $snapshot_bytes: e.size,
                $snapshot_data: e.data,
                $session_id: e.sessionId,
                $window_id: e.windowId,
                $lib: "web",
                $lib_version: Tr.LIB_VERSION
            })
        }));
        return this.clearBuffer()
    }
    _captureSnapshotBuffered(e) {
        var t, n = 2 + ((null === (t = this.buffer) || void 0 === t ? void 0 : t.data.length) || 0);
        !this.isIdle && (this.buffer.size + e.$snapshot_bytes + n > 943718.4 || this.buffer.sessionId !== this.sessionId) && (this.buffer = this._flushBuffer()), this.buffer.size += e.$snapshot_bytes, this.buffer.data.push(e.$snapshot_data), this.flushBufferTimer || this.isIdle || (this.flushBufferTimer = setTimeout((() => {
            this._flushBuffer()
        }), 2e3))
    }
    _captureSnapshot(e) {
        this.instance.capture("$snapshot", e, {
            _url: this.instance.requestRouter.endpointFor("api", this._endpoint),
            _noTruncate: !0,
            _batchKey: "recordings",
            skip_client_rate_limiting: !0
        })
    }
    _checkUrlTriggerConditions() {
        if (void 0 !== Vn && Vn.location.href) {
            var e = Vn.location.href,
                t = "paused" === this.status,
                n = ah(e, this._urlBlocklist);
            n && !t ? this._pauseRecording() : !n && t && this._resumeRecording(), ah(e, this._urlTriggers) && this._activateTrigger("url")
        }
    }
    _activateTrigger(e) {
        var t, n;
        "trigger_pending" === this.triggerStatus && (null === (t = this.instance) || void 0 === t || null === (n = t.persistence) || void 0 === n || n.register({
            ["url" === e ? gi : fi]: this.sessionId
        }), this._flushBuffer(), this._reportStarted(e + "_trigger_matched"))
    }
    _pauseRecording() {
        "paused" !== this.status && (this._urlBlocked = !0, clearInterval(this._fullSnapshotTimer), th.info("recording paused due to URL blocker"), this._tryAddCustomEvent("recording paused", {
            reason: "url blocker"
        }))
    }
    _resumeRecording() {
        "paused" === this.status && (this._urlBlocked = !1, this._tryTakeFullSnapshot(), this._scheduleFullSnapshot(), this._tryAddCustomEvent("recording resumed", {
            reason: "left blocked url"
        }), th.info("recording resumed"))
    }
    _addEventTriggerListener() {
        0 !== this._eventTriggers.length && Sr(this._removeEventTriggerCaptureHook) && (this._removeEventTriggerCaptureHook = this.instance.on("eventCaptured", (e => {
            try {
                this._eventTriggers.includes(e.event) && this._activateTrigger("event")
            } catch (e) {
                th.error("Could not activate event trigger", e)
            }
        })))
    }
    overrideLinkedFlag() {
        this._linkedFlagSeen = !0, this._tryTakeFullSnapshot(), this._reportStarted("linked_flag_overridden")
    }
    overrideSampling() {
        var e;
        null === (e = this.instance.persistence) || void 0 === e || e.register({
            [vi]: !0
        }), this._tryTakeFullSnapshot(), this._reportStarted("sampling_overridden")
    }
    overrideTrigger(e) {
        this._activateTrigger(e)
    }
    _reportStarted(e, t) {
        this.instance.register_for_session({
            $session_recording_start_reason: e
        }), th.info(e.replace("_", " "), t), or(["recording_initialized", "session_id_changed"], e) || this._tryAddCustomEvent(e, t)
    }
}
var ch = Ar("[RemoteConfig]");
class uh {
    constructor(e) {
        this.instance = e
    }
    get remoteConfig() {
        var e, t;
        return null === (e = tr._POSTHOG_REMOTE_CONFIG) || void 0 === e || null === (t = e[this.instance.config.token]) || void 0 === t ? void 0 : t.config
    }
    _loadRemoteConfigJs(e) {
        var t, n, r;
        null !== (t = tr.__PosthogExtensions__) && void 0 !== t && t.loadExternalDependency ? null === (n = tr.__PosthogExtensions__) || void 0 === n || null === (r = n.loadExternalDependency) || void 0 === r || r.call(n, this.instance, "remote-config", (() => e(this.remoteConfig))) : (ch.error("PostHog Extensions not found. Cannot load remote config."), e())
    }
    _loadRemoteConfigJSON(e) {
        this.instance._send_request({
            method: "GET",
            url: this.instance.requestRouter.endpointFor("assets", "/array/".concat(this.instance.config.token, "/config")),
            callback: t => {
                e(t.json)
            }
        })
    }
    load() {
        try {
            if (this.remoteConfig) return ch.info("Using preloaded remote config", this.remoteConfig), void this.onRemoteConfig(this.remoteConfig);
            if (this.instance.config.advanced_disable_decide) return void ch.warn("Remote config is disabled. Falling back to local config.");
            this._loadRemoteConfigJs((e => {
                if (!e) return ch.info("No config found after loading remote JS config. Falling back to JSON."), void this._loadRemoteConfigJSON((e => {
                    this.onRemoteConfig(e)
                }));
                this.onRemoteConfig(e)
            }))
        } catch (e) {
            ch.error("Error loading remote config", e)
        }
    }
    onRemoteConfig(e) {
        e ? this.instance.config.__preview_remote_config ? (this.instance._onRemoteConfig(e), !1 !== e.hasFeatureFlags && this.instance.featureFlags.ensureFlagsLoaded()) : ch.info("__preview_remote_config is disabled. Logging config instead", e) : ch.error("Failed to fetch remote config from PostHog.")
    }
}
var dh, hh = null != Vn && Vn.location ? Xr(Vn.location.hash, "__posthog") || Xr(location.hash, "state") : null,
    ph = "_postHogToolbarParams",
    vh = Ar("[Toolbar]");
! function(e) {
    e[e.UNINITIALIZED = 0] = "UNINITIALIZED", e[e.LOADING = 1] = "LOADING", e[e.LOADED = 2] = "LOADED"
}(dh || (dh = {}));
class gh {
    constructor(e) {
        this.instance = e
    }
    setToolbarState(e) {
        tr.ph_toolbar_state = e
    }
    getToolbarState() {
        var e;
        return null !== (e = tr.ph_toolbar_state) && void 0 !== e ? e : dh.UNINITIALIZED
    }
    maybeLoadToolbar() {
        var e, t, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0,
            r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0,
            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
        if (!Vn || !Yn) return !1;
        n = null !== (e = n) && void 0 !== e ? e : Vn.location, i = null !== (t = i) && void 0 !== t ? t : Vn.history;
        try {
            if (!r) {
                try {
                    Vn.localStorage.setItem("test", "test"), Vn.localStorage.removeItem("test")
                } catch (e) {
                    return !1
                }
                r = null == Vn ? void 0 : Vn.localStorage
            }
            var o, s = hh || Xr(n.hash, "__posthog") || Xr(n.hash, "state"),
                a = s ? Br((() => JSON.parse(atob(decodeURIComponent(s))))) || Br((() => JSON.parse(decodeURIComponent(s)))) : null;
            return a && "ph_authorize" === a.action ? ((o = a).source = "url", o && Object.keys(o).length > 0 && (a.desiredHash ? n.hash = a.desiredHash : i ? i.replaceState(i.state, "", n.pathname + n.search) : n.hash = "")) : ((o = JSON.parse(r.getItem(ph) || "{}")).source = "localstorage", delete o.userIntent), !(!o.token || this.instance.config.token !== o.token) && (this.loadToolbar(o), !0)
        } catch (e) {
            return !1
        }
    }
    _callLoadToolbar(e) {
        var t = tr.ph_load_toolbar || tr.ph_load_editor;
        !Sr(t) && pr(t) ? t(e, this.instance) : vh.warn("No toolbar load function found")
    }
    loadToolbar(e) {
        var n = !(null == Yn || !Yn.getElementById(Ai));
        if (!Vn || n) return !1;
        var r = "custom" === this.instance.requestRouter.region && this.instance.config.advanced_disable_toolbar_metrics,
            i = t(t({
                token: this.instance.config.token
            }, e), {}, {
                apiURL: this.instance.requestRouter.endpointFor("ui")
            }, r ? {
                instrument: !1
            } : {});
        if (Vn.localStorage.setItem(ph, JSON.stringify(t(t({}, i), {}, {
                source: void 0
            }))), this.getToolbarState() === dh.LOADED) this._callLoadToolbar(i);
        else if (this.getToolbarState() === dh.UNINITIALIZED) {
            var o, s;
            this.setToolbarState(dh.LOADING), null === (o = tr.__PosthogExtensions__) || void 0 === o || null === (s = o.loadExternalDependency) || void 0 === s || s.call(o, this.instance, "toolbar", (e => {
                if (e) return vh.error("[Toolbar] Failed to load", e), void this.setToolbarState(dh.UNINITIALIZED);
                this.setToolbarState(dh.LOADED), this._callLoadToolbar(i)
            })), Wr(Vn, "turbolinks:load", (() => {
                this.setToolbarState(dh.UNINITIALIZED), this.loadToolbar(i)
            }))
        }
        return !0
    }
    _loadEditor(e) {
        return this.loadToolbar(e)
    }
    maybeLoadEditor() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0,
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0,
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
        return this.maybeLoadToolbar(e, t, n)
    }
}
class fh {
    constructor(e) {
        i(this, "isPaused", !0), i(this, "queue", []), i(this, "flushTimeoutMs", 3e3), this.sendRequest = e
    }
    enqueue(e) {
        this.queue.push(e), this.flushTimeout || this.setFlushTimeout()
    }
    unload() {
        this.clearFlushTimeout();
        var e = this.queue.length > 0 ? this.formatQueue() : {},
            n = Object.values(e),
            r = [...n.filter((e => 0 === e.url.indexOf("/e"))), ...n.filter((e => 0 !== e.url.indexOf("/e")))];
        r.map((e => {
            this.sendRequest(t(t({}, e), {}, {
                transport: "sendBeacon"
            }))
        }))
    }
    enable() {
        this.isPaused = !1, this.setFlushTimeout()
    }
    setFlushTimeout() {
        var e = this;
        this.isPaused || (this.flushTimeout = setTimeout((() => {
            if (this.clearFlushTimeout(), this.queue.length > 0) {
                var t = this.formatQueue(),
                    n = function(n) {
                        var r = t[n],
                            i = (new Date).getTime();
                        r.data && hr(r.data) && Or(r.data, (e => {
                            e.offset = Math.abs(e.timestamp - i), delete e.timestamp
                        })), e.sendRequest(r)
                    };
                for (var r in t) n(r)
            }
        }), this.flushTimeoutMs))
    }
    clearFlushTimeout() {
        clearTimeout(this.flushTimeout), this.flushTimeout = void 0
    }
    formatQueue() {
        var e = {};
        return Or(this.queue, (n => {
            var r, i = n,
                o = (i ? i.batchKey : null) || i.url;
            _r(e[o]) && (e[o] = t(t({}, i), {}, {
                data: []
            })), null === (r = e[o].data) || void 0 === r || r.push(i.data)
        })), this.queue = [], e
    }
}
var mh = function(e) {
        var t, n, r, i, o = "";
        for (t = n = 0, r = (e = (e + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length, i = 0; i < r; i++) {
            var s = e.charCodeAt(i),
                a = null;
            s < 128 ? n++ : a = s > 127 && s < 2048 ? String.fromCharCode(s >> 6 | 192, 63 & s | 128) : String.fromCharCode(s >> 12 | 224, s >> 6 & 63 | 128, 63 & s | 128), wr(a) || (n > t && (o += e.substring(t, n)), o += a, t = n = i + 1)
        }
        return n > t && (o += e.substring(t, e.length)), o
    },
    _h = !!Kn || !!Jn,
    yh = "text/plain",
    bh = (e, n) => {
        var [r, i] = e.split("?"), o = t({}, n);
        null == i || i.split("&").forEach((e => {
            var [t] = e.split("=");
            delete o[t]
        }));
        var s = jr(o);
        return s = s ? (i ? i + "&" : "") + s : i, "".concat(r, "?").concat(s)
    },
    wh = (e, t) => JSON.stringify(e, ((e, t) => "bigint" == typeof t ? t.toString() : t), t),
    Sh = e => {
        var {
            data: t,
            compression: n
        } = e;
        if (t) {
            if (n === $n.GZipJS) {
                var r = Kd(Qd(wh(t)), {
                        mtime: 0
                    }),
                    i = new Blob([r], {
                        type: yh
                    });
                return {
                    contentType: yh,
                    body: i,
                    estimatedSize: i.size
                }
            }
            if (n === $n.Base64) {
                var o = function(e) {
                        var t, n, r, i, o, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                            a = 0,
                            l = 0,
                            c = "",
                            u = [];
                        if (!e) return e;
                        e = mh(e);
                        do {
                            t = (o = e.charCodeAt(a++) << 16 | e.charCodeAt(a++) << 8 | e.charCodeAt(a++)) >> 18 & 63, n = o >> 12 & 63, r = o >> 6 & 63, i = 63 & o, u[l++] = s.charAt(t) + s.charAt(n) + s.charAt(r) + s.charAt(i)
                        } while (a < e.length);
                        switch (c = u.join(""), e.length % 3) {
                            case 1:
                                c = c.slice(0, -2) + "==";
                                break;
                            case 2:
                                c = c.slice(0, -1) + "="
                        }
                        return c
                    }(wh(t)),
                    s = (e => "data=" + encodeURIComponent("string" == typeof e ? e : wh(e)))(o);
                return {
                    contentType: "application/x-www-form-urlencoded",
                    body: s,
                    estimatedSize: new Blob([s]).size
                }
            }
            var a = wh(t);
            return {
                contentType: "application/json",
                body: a,
                estimatedSize: new Blob([a]).size
            }
        }
    },
    Ch = [];
Jn && Ch.push({
    transport: "fetch",
    method: e => {
        var n, r, {
                contentType: i,
                body: o,
                estimatedSize: s
            } = null !== (n = Sh(e)) && void 0 !== n ? n : {},
            a = new Headers;
        Or(e.headers, (function(e, t) {
            a.append(t, e)
        })), i && a.append("Content-Type", i);
        var l = e.url,
            c = null;
        if (Qn) {
            var u = new Qn;
            c = {
                signal: u.signal,
                timeout: setTimeout((() => u.abort()), e.timeout)
            }
        }
        Jn(l, t({
            method: (null == e ? void 0 : e.method) || "GET",
            headers: a,
            keepalive: "POST" === e.method && (s || 0) < 52428.8,
            body: o,
            signal: null === (r = c) || void 0 === r ? void 0 : r.signal
        }, e.fetchOptions)).then((t => t.text().then((n => {
            var r, i = {
                statusCode: t.status,
                text: n
            };
            if (200 === t.status) try {
                i.json = JSON.parse(n)
            } catch (e) {
                Rr.error(e)
            }
            null === (r = e.callback) || void 0 === r || r.call(e, i)
        })))).catch((t => {
            var n;
            Rr.error(t), null === (n = e.callback) || void 0 === n || n.call(e, {
                statusCode: 0,
                text: t
            })
        })).finally((() => c ? clearTimeout(c.timeout) : null))
    }
}), Kn && Ch.push({
    transport: "XHR",
    method: e => {
        var t, n = new Kn;
        n.open(e.method || "GET", e.url, !0);
        var {
            contentType: r,
            body: i
        } = null !== (t = Sh(e)) && void 0 !== t ? t : {};
        Or(e.headers, (function(e, t) {
            n.setRequestHeader(t, e)
        })), r && n.setRequestHeader("Content-Type", r), e.timeout && (n.timeout = e.timeout), n.withCredentials = !0, n.onreadystatechange = () => {
            if (4 === n.readyState) {
                var t, r = {
                    statusCode: n.status,
                    text: n.responseText
                };
                if (200 === n.status) try {
                    r.json = JSON.parse(n.responseText)
                } catch (e) {}
                null === (t = e.callback) || void 0 === t || t.call(e, r)
            }
        }, n.send(i)
    }
}), null != zn && zn.sendBeacon && Ch.push({
    transport: "sendBeacon",
    method: e => {
        var t = bh(e.url, {
            beacon: "1"
        });
        try {
            var n, {
                    contentType: r,
                    body: i
                } = null !== (n = Sh(e)) && void 0 !== n ? n : {},
                o = "string" == typeof i ? new Blob([i], {
                    type: r
                }) : i;
            zn.sendBeacon(t, o)
        } catch (e) {}
    }
});
var Ih = ["retriesPerformedSoFar"];
class kh {
    constructor(e) {
        i(this, "isPolling", !1), i(this, "pollIntervalMs", 3e3), i(this, "queue", []), this.instance = e, this.queue = [], this.areWeOnline = !0, !_r(Vn) && "onLine" in Vn.navigator && (this.areWeOnline = Vn.navigator.onLine, Vn.addEventListener("online", (() => {
            this.areWeOnline = !0, this.flush()
        })), Vn.addEventListener("offline", (() => {
            this.areWeOnline = !1
        })))
    }
    retriableRequest(e) {
        var {
            retriesPerformedSoFar: n
        } = e, r = o(e, Ih);
        Cr(n) && n > 0 && (r.url = bh(r.url, {
            retry_count: n
        })), this.instance._send_request(t(t({}, r), {}, {
            callback: e => {
                var i;
                200 !== e.statusCode && (e.statusCode < 400 || e.statusCode >= 500) && (null != n ? n : 0) < 10 ? this.enqueue(t({
                    retriesPerformedSoFar: n
                }, r)) : null === (i = r.callback) || void 0 === i || i.call(r, e)
            }
        }))
    }
    enqueue(e) {
        var t = e.retriesPerformedSoFar || 0;
        e.retriesPerformedSoFar = t + 1;
        var n = function(e) {
                var t = 3e3 * Math.pow(2, e),
                    n = t / 2,
                    r = Math.min(18e5, t),
                    i = (Math.random() - .5) * (r - n);
                return Math.ceil(r + i)
            }(t),
            r = Date.now() + n;
        this.queue.push({
            retryAt: r,
            requestOptions: e
        });
        var i = "Enqueued failed request for retry in ".concat(n);
        navigator.onLine || (i += " (Browser is offline)"), Rr.warn(i), this.isPolling || (this.isPolling = !0, this.poll())
    }
    poll() {
        this.poller && clearTimeout(this.poller), this.poller = setTimeout((() => {
            this.areWeOnline && this.queue.length > 0 && this.flush(), this.poll()
        }), this.pollIntervalMs)
    }
    flush() {
        var e = Date.now(),
            t = [],
            n = this.queue.filter((n => n.retryAt < e || (t.push(n), !1)));
        if (this.queue = t, n.length > 0)
            for (var {
                    requestOptions: r
                }
                of n) this.retriableRequest(r)
    }
    unload() {
        for (var {
                requestOptions: e
            }
            of(this.poller && (clearTimeout(this.poller), this.poller = void 0), this.queue)) try {
            this.instance._send_request(t(t({}, e), {}, {
                transport: "sendBeacon"
            }))
        } catch (e) {
            Rr.error(e)
        }
        this.queue = []
    }
}
var Eh, xh = Ar("[SessionId]");
class Th {
    constructor(e, t, n) {
        var r;
        if (i(this, "_sessionIdChangedHandlers", []), !e.persistence) throw new Error("SessionIdManager requires a PostHogPersistence instance");
        if (e.config.__preview_experimental_cookieless_mode) throw new Error("SessionIdManager cannot be used with __preview_experimental_cookieless_mode");
        this.config = e.config, this.persistence = e.persistence, this._windowId = void 0, this._sessionId = void 0, this._sessionStartTimestamp = null, this._sessionActivityTimestamp = null, this._sessionIdGenerator = t || jc, this._windowIdGenerator = n || jc;
        var o = this.config.persistence_name || this.config.token,
            s = this.config.session_idle_timeout_seconds || 1800;
        if (this._sessionTimeoutMs = 1e3 * vd(s, 60, 36e3, "session_idle_timeout_seconds", 1800), e.register({
                $configured_session_timeout_ms: this._sessionTimeoutMs
            }), this.resetIdleTimer(), this._window_id_storage_key = "ph_" + o + "_window_id", this._primary_window_exists_storage_key = "ph_" + o + "_primary_window_exists", this._canUseSessionStorage()) {
            var a = au.parse(this._window_id_storage_key),
                l = au.parse(this._primary_window_exists_storage_key);
            a && !l ? this._windowId = a : au.remove(this._window_id_storage_key), au.set(this._primary_window_exists_storage_key, !0)
        }
        if (null !== (r = this.config.bootstrap) && void 0 !== r && r.sessionID) try {
            var c = (e => {
                var t = e.replace(/-/g, "");
                if (32 !== t.length) throw new Error("Not a valid UUID");
                if ("7" !== t[12]) throw new Error("Not a UUIDv7");
                return parseInt(t.substring(0, 12), 16)
            })(this.config.bootstrap.sessionID);
            this._setSessionId(this.config.bootstrap.sessionID, (new Date).getTime(), c)
        } catch (e) {
            xh.error("Invalid sessionID in bootstrap", e)
        }
        this._listenToReloadWindow()
    }
    get sessionTimeoutMs() {
        return this._sessionTimeoutMs
    }
    onSessionId(e) {
        return _r(this._sessionIdChangedHandlers) && (this._sessionIdChangedHandlers = []), this._sessionIdChangedHandlers.push(e), this._sessionId && e(this._sessionId, this._windowId), () => {
            this._sessionIdChangedHandlers = this._sessionIdChangedHandlers.filter((t => t !== e))
        }
    }
    _canUseSessionStorage() {
        return "memory" !== this.config.persistence && !this.persistence.disabled && au.is_supported()
    }
    _setWindowId(e) {
        e !== this._windowId && (this._windowId = e, this._canUseSessionStorage() && au.set(this._window_id_storage_key, e))
    }
    _getWindowId() {
        return this._windowId ? this._windowId : this._canUseSessionStorage() ? au.parse(this._window_id_storage_key) : null
    }
    _setSessionId(e, t, n) {
        e === this._sessionId && t === this._sessionActivityTimestamp && n === this._sessionStartTimestamp || (this._sessionStartTimestamp = n, this._sessionActivityTimestamp = t, this._sessionId = e, this.persistence.register({
            [pi]: [t, e, n]
        }))
    }
    _getSessionId() {
        if (this._sessionId && this._sessionActivityTimestamp && this._sessionStartTimestamp) return [this._sessionActivityTimestamp, this._sessionId, this._sessionStartTimestamp];
        var e = this.persistence.props[pi];
        return hr(e) && 2 === e.length && e.push(e[0]), e || [0, null, 0]
    }
    resetSessionId() {
        this._setSessionId(null, null, null)
    }
    _listenToReloadWindow() {
        null == Vn || Vn.addEventListener("beforeunload", (() => {
            this._canUseSessionStorage() && au.remove(this._primary_window_exists_storage_key)
        }))
    }
    checkAndGetSessionAndWindowId() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        if (this.config.__preview_experimental_cookieless_mode) throw new Error("checkAndGetSessionAndWindowId should not be called in __preview_experimental_cookieless_mode");
        var n = t || (new Date).getTime(),
            [r, i, o] = this._getSessionId(),
            s = this._getWindowId(),
            a = Cr(o) && o > 0 && Math.abs(n - o) > 864e5,
            l = !1,
            c = !i,
            u = !e && Math.abs(n - r) > this.sessionTimeoutMs;
        c || u || a ? (i = this._sessionIdGenerator(), s = this._windowIdGenerator(), xh.info("new session ID generated", {
            sessionId: i,
            windowId: s,
            changeReason: {
                noSessionId: c,
                activityTimeout: u,
                sessionPastMaximumLength: a
            }
        }), o = n, l = !0) : s || (s = this._windowIdGenerator(), l = !0);
        var d = 0 === r || !e || a ? n : r,
            h = 0 === o ? (new Date).getTime() : o;
        return this._setWindowId(s), this._setSessionId(i, d, h), e || this.resetIdleTimer(), l && this._sessionIdChangedHandlers.forEach((e => e(i, s, l ? {
            noSessionId: c,
            activityTimeout: u,
            sessionPastMaximumLength: a
        } : void 0))), {
            sessionId: i,
            windowId: s,
            sessionStartTimestamp: h,
            changeReason: l ? {
                noSessionId: c,
                activityTimeout: u,
                sessionPastMaximumLength: a
            } : void 0,
            lastActivityTimestamp: r
        }
    }
    resetIdleTimer() {
        clearTimeout(this._enforceIdleTimeout), this._enforceIdleTimeout = setTimeout((() => {
            this.resetSessionId()
        }), 1.1 * this.sessionTimeoutMs)
    }
}! function(e) {
    e.US = "us", e.EU = "eu", e.CUSTOM = "custom"
}(Eh || (Eh = {}));
var Mh = "i.posthog.com";
class Rh {
    constructor(e) {
        i(this, "_regionCache", {}), this.instance = e
    }
    get apiHost() {
        var e = this.instance.config.api_host.trim().replace(/\/$/, "");
        return "https://app.posthog.com" === e ? "https://us.i.posthog.com" : e
    }
    get uiHost() {
        var e, t = null === (e = this.instance.config.ui_host) || void 0 === e ? void 0 : e.replace(/\/$/, "");
        return t || (t = this.apiHost.replace(".".concat(Mh), ".posthog.com")), "https://app.posthog.com" === t ? "https://us.posthog.com" : t
    }
    get region() {
        return this._regionCache[this.apiHost] || (/https:\/\/(app|us|us-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this._regionCache[this.apiHost] = Eh.US : /https:\/\/(eu|eu-assets)(\.i)?\.posthog\.com/i.test(this.apiHost) ? this._regionCache[this.apiHost] = Eh.EU : this._regionCache[this.apiHost] = Eh.CUSTOM), this._regionCache[this.apiHost]
    }
    endpointFor(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        if (t && (t = "/" === t[0] ? t : "/".concat(t)), "ui" === e) return this.uiHost + t;
        if (this.region === Eh.CUSTOM) return this.apiHost + t;
        var n = Mh + t;
        switch (e) {
            case "assets":
                return "https://".concat(this.region, "-assets.").concat(n);
            case "api":
                return "https://".concat(this.region, ".").concat(n)
        }
    }
}
var Ah = "posthog-js";

function Nh(e) {
    var {
        organization: t,
        projectId: n,
        prefix: r,
        severityAllowList: i = ["error"]
    } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return o => {
        var s, a, l, c, u;
        if (!("*" === i || i.includes(o.level)) || !e.__loaded) return o;
        o.tags || (o.tags = {});
        var d = e.requestRouter.endpointFor("ui", "/project/".concat(e.config.token, "/person/").concat(e.get_distinct_id()));
        o.tags["PostHog Person URL"] = d, e.sessionRecordingStarted() && (o.tags["PostHog Recording URL"] = e.get_session_replay_url({
            withTimestamp: !0
        }));
        var h = (null === (s = o.exception) || void 0 === s ? void 0 : s.values) || [];
        h.map((e => {
            e.stacktrace && (e.stacktrace.type = "raw")
        }));
        var p = {
            $exception_message: (null === (a = h[0]) || void 0 === a ? void 0 : a.value) || o.message,
            $exception_type: null === (l = h[0]) || void 0 === l ? void 0 : l.type,
            $exception_personURL: d,
            $exception_level: o.level,
            $exception_list: h,
            $sentry_event_id: o.event_id,
            $sentry_exception: o.exception,
            $sentry_exception_message: (null === (c = h[0]) || void 0 === c ? void 0 : c.value) || o.message,
            $sentry_exception_type: null === (u = h[0]) || void 0 === u ? void 0 : u.type,
            $sentry_tags: o.tags
        };
        return t && n && (p.$sentry_url = (r || "https://sentry.io/organizations/") + t + "/issues/?project=" + n + "&query=" + o.event_id), e.exceptions.sendExceptionEvent(p), o
    }
}
class Fh {
    constructor(e, t, n, r, i) {
        this.name = Ah, this.setupOnce = function(o) {
            o(Nh(e, {
                organization: t,
                projectId: n,
                prefix: r,
                severityAllowList: i
            }))
        }
    }
}
var Oh = Ar("[SegmentIntegration]");

function Ph(e, t) {
    var n = e.config.segment;
    if (!n) return t();
    ! function(e, t) {
        var n = e.config.segment;
        if (!n) return t();
        var r = n => {
                var r = () => n.anonymousId() || jc();
                e.config.get_device_id = r, n.id() && (e.register({
                    distinct_id: n.id(),
                    $device_id: r()
                }), e.persistence.set_property(Ii, "identified")), t()
            },
            i = n.user();
        "then" in i && pr(i.then) ? i.then((e => r(e))) : r(i)
    }(e, (() => {
        n.register((e => {
            Promise && Promise.resolve || Oh.warn("This browser does not have Promise support, and can not use the segment integration");
            var t = (t, n) => {
                var r;
                if (!n) return t;
                t.event.userId || t.event.anonymousId === e.get_distinct_id() || (Oh.info("No userId set, resetting PostHog"), e.reset()), t.event.userId && t.event.userId !== e.get_distinct_id() && (Oh.info("UserId set, identifying with PostHog"), e.identify(t.event.userId));
                var i = e._calculate_event_properties(n, null !== (r = t.event.properties) && void 0 !== r ? r : {}, new Date);
                return t.event.properties = Object.assign({}, i, t.event.properties), t
            };
            return {
                name: "PostHog JS",
                type: "enrichment",
                version: "1.0.0",
                isLoaded: () => !0,
                load: () => Promise.resolve(),
                track: e => t(e, e.event.event),
                page: e => t(e, "$pageview"),
                identify: e => t(e, "$identify"),
                screen: e => t(e, "$screen")
            }
        })(e)).then((() => {
            t()
        }))
    }))
}
class Lh {
    constructor(e) {
        this._instance = e
    }
    doPageView(e, t) {
        var n, r = this._previousPageViewProperties(e, t);
        return this._currentPageview = {
            pathname: null !== (n = null == Vn ? void 0 : Vn.location.pathname) && void 0 !== n ? n : "",
            pageViewId: t,
            timestamp: e
        }, this._instance.scrollManager.resetContext(), r
    }
    doPageLeave(e) {
        var t;
        return this._previousPageViewProperties(e, null === (t = this._currentPageview) || void 0 === t ? void 0 : t.pageViewId)
    }
    doEvent() {
        var e;
        return {
            $pageview_id: null === (e = this._currentPageview) || void 0 === e ? void 0 : e.pageViewId
        }
    }
    _previousPageViewProperties(e, t) {
        var n = this._currentPageview;
        if (!n) return {
            $pageview_id: t
        };
        var r = {
                $pageview_id: t,
                $prev_pageview_id: n.pageViewId
            },
            i = this._instance.scrollManager.getContext();
        if (i && !this._instance.config.disable_scroll_properties) {
            var {
                maxScrollHeight: o,
                lastScrollY: s,
                maxScrollY: a,
                maxContentHeight: l,
                lastContentY: c,
                maxContentY: u
            } = i;
            if (!(_r(o) || _r(s) || _r(a) || _r(l) || _r(c) || _r(u))) {
                o = Math.ceil(o), s = Math.ceil(s), a = Math.ceil(a), l = Math.ceil(l), c = Math.ceil(c), u = Math.ceil(u);
                var d = o <= 1 ? 1 : vd(s / o, 0, 1),
                    h = o <= 1 ? 1 : vd(a / o, 0, 1),
                    p = l <= 1 ? 1 : vd(c / l, 0, 1),
                    v = l <= 1 ? 1 : vd(u / l, 0, 1);
                r = Pr(r, {
                    $prev_pageview_last_scroll: s,
                    $prev_pageview_last_scroll_percentage: d,
                    $prev_pageview_max_scroll: a,
                    $prev_pageview_max_scroll_percentage: h,
                    $prev_pageview_last_content: c,
                    $prev_pageview_last_content_percentage: p,
                    $prev_pageview_max_content: u,
                    $prev_pageview_max_content_percentage: v
                })
            }
        }
        return n.pathname && (r.$prev_pageview_pathname = n.pathname), n.timestamp && (r.$prev_pageview_duration = (e.getTime() - n.timestamp.getTime()) / 1e3), r
    }
}
class Dh {
    constructor() {
        i(this, "events", {}), this.events = {}
    }
    on(e, t) {
        return this.events[e] || (this.events[e] = []), this.events[e].push(t), () => {
            this.events[e] = this.events[e].filter((e => e !== t))
        }
    }
    emit(e, t) {
        for (var n of this.events[e] || []) n(t);
        for (var r of this.events["*"] || []) r(e, t)
    }
}
class Bh {
    constructor(e) {
        i(this, "_debugEventEmitter", new Dh), i(this, "checkStep", ((e, t) => this.checkStepEvent(e, t) && this.checkStepUrl(e, t) && this.checkStepElement(e, t))), i(this, "checkStepEvent", ((e, t) => null == t || !t.event || (null == e ? void 0 : e.event) === (null == t ? void 0 : t.event))), this.instance = e, this.actionEvents = new Set, this.actionRegistry = new Set
    }
    init() {
        var e;
        if (!_r(null === (e = this.instance) || void 0 === e ? void 0 : e._addCaptureHook)) {
            var t;
            null === (t = this.instance) || void 0 === t || t._addCaptureHook(((e, t) => {
                this.on(e, t)
            }))
        }
    }
    register(e) {
        var t, n;
        if (!_r(null === (t = this.instance) || void 0 === t ? void 0 : t._addCaptureHook) && (e.forEach((e => {
                var t, n;
                null === (t = this.actionRegistry) || void 0 === t || t.add(e), null === (n = e.steps) || void 0 === n || n.forEach((e => {
                    var t;
                    null === (t = this.actionEvents) || void 0 === t || t.add((null == e ? void 0 : e.event) || "")
                }))
            })), null !== (n = this.instance) && void 0 !== n && n.autocapture)) {
            var r, i = new Set;
            e.forEach((e => {
                var t;
                null === (t = e.steps) || void 0 === t || t.forEach((e => {
                    null != e && e.selector && i.add(null == e ? void 0 : e.selector)
                }))
            })), null === (r = this.instance) || void 0 === r || r.autocapture.setElementSelectors(i)
        }
    }
    on(e, t) {
        var n;
        null != t && 0 != e.length && (this.actionEvents.has(e) || this.actionEvents.has(null == t ? void 0 : t.event)) && this.actionRegistry && (null === (n = this.actionRegistry) || void 0 === n ? void 0 : n.size) > 0 && this.actionRegistry.forEach((e => {
            this.checkAction(t, e) && this._debugEventEmitter.emit("actionCaptured", e.name)
        }))
    }
    _addActionHook(e) {
        this.onAction("actionCaptured", (t => e(t)))
    }
    checkAction(e, t) {
        if (null == (null == t ? void 0 : t.steps)) return !1;
        for (var n of t.steps)
            if (this.checkStep(e, n)) return !0;
        return !1
    }
    onAction(e, t) {
        return this._debugEventEmitter.on(e, t)
    }
    checkStepUrl(e, t) {
        if (null != t && t.url) {
            var n, r = null == e || null === (n = e.properties) || void 0 === n ? void 0 : n.$current_url;
            if (!r || "string" != typeof r) return !1;
            if (!Bh.matchString(r, null == t ? void 0 : t.url, (null == t ? void 0 : t.url_matching) || "contains")) return !1
        }
        return !0
    }
    static matchString(e, t, n) {
        switch (n) {
            case "regex":
                return !!Vn && Ur(e, t);
            case "exact":
                return t === e;
            case "contains":
                var r = Bh.escapeStringRegexp(t).replace(/_/g, ".").replace(/%/g, ".*");
                return Ur(e, r);
            default:
                return !1
        }
    }
    static escapeStringRegexp(e) {
        return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d")
    }
    checkStepElement(e, t) {
        if ((null != t && t.href || null != t && t.tag_name || null != t && t.text) && !this.getElementsList(e).some((e => !(null != t && t.href && !Bh.matchString(e.href || "", null == t ? void 0 : t.href, (null == t ? void 0 : t.href_matching) || "exact")) && ((null == t || !t.tag_name || e.tag_name === (null == t ? void 0 : t.tag_name)) && !(null != t && t.text && !Bh.matchString(e.text || "", null == t ? void 0 : t.text, (null == t ? void 0 : t.text_matching) || "exact") && !Bh.matchString(e.$el_text || "", null == t ? void 0 : t.text, (null == t ? void 0 : t.text_matching) || "exact")))))) return !1;
        if (null != t && t.selector) {
            var n, r = null == e || null === (n = e.properties) || void 0 === n ? void 0 : n.$element_selectors;
            if (!r) return !1;
            if (!r.includes(null == t ? void 0 : t.selector)) return !1
        }
        return !0
    }
    getElementsList(e) {
        return null == (null == e ? void 0 : e.properties.$elements) ? [] : null == e ? void 0 : e.properties.$elements
    }
}
class qh {
    constructor(e) {
        this.instance = e, this.eventToSurveys = new Map, this.actionToSurveys = new Map
    }
    register(e) {
        var t;
        _r(null === (t = this.instance) || void 0 === t ? void 0 : t._addCaptureHook) || (this.setupEventBasedSurveys(e), this.setupActionBasedSurveys(e))
    }
    setupActionBasedSurveys(e) {
        var t = e.filter((e => {
            var t, n, r, i;
            return (null === (t = e.conditions) || void 0 === t ? void 0 : t.actions) && (null === (n = e.conditions) || void 0 === n || null === (r = n.actions) || void 0 === r || null === (i = r.values) || void 0 === i ? void 0 : i.length) > 0
        }));
        if (0 !== t.length) {
            if (null == this.actionMatcher) {
                this.actionMatcher = new Bh(this.instance), this.actionMatcher.init();
                this.actionMatcher._addActionHook((e => {
                    this.onAction(e)
                }))
            }
            t.forEach((e => {
                var t, n, r, i, o, s, a, l, c, u;
                e.conditions && null !== (t = e.conditions) && void 0 !== t && t.actions && null !== (n = e.conditions) && void 0 !== n && null !== (r = n.actions) && void 0 !== r && r.values && (null === (i = e.conditions) || void 0 === i || null === (o = i.actions) || void 0 === o || null === (s = o.values) || void 0 === s ? void 0 : s.length) > 0 && (null === (a = this.actionMatcher) || void 0 === a || a.register(e.conditions.actions.values), null === (l = e.conditions) || void 0 === l || null === (c = l.actions) || void 0 === c || null === (u = c.values) || void 0 === u || u.forEach((t => {
                    if (t && t.name) {
                        var n = this.actionToSurveys.get(t.name);
                        n && n.push(e.id), this.actionToSurveys.set(t.name, n || [e.id])
                    }
                })))
            }))
        }
    }
    setupEventBasedSurveys(e) {
        var t;
        if (0 !== e.filter((e => {
                var t, n, r, i;
                return (null === (t = e.conditions) || void 0 === t ? void 0 : t.events) && (null === (n = e.conditions) || void 0 === n || null === (r = n.events) || void 0 === r || null === (i = r.values) || void 0 === i ? void 0 : i.length) > 0
            })).length) {
            null === (t = this.instance) || void 0 === t || t._addCaptureHook(((e, t) => {
                this.onEvent(e, t)
            })), e.forEach((e => {
                var t, n, r;
                null === (t = e.conditions) || void 0 === t || null === (n = t.events) || void 0 === n || null === (r = n.values) || void 0 === r || r.forEach((t => {
                    if (t && t.name) {
                        var n = this.eventToSurveys.get(t.name);
                        n && n.push(e.id), this.eventToSurveys.set(t.name, n || [e.id])
                    }
                }))
            }))
        }
    }
    onEvent(e, t) {
        var n, r, i = (null === (n = this.instance) || void 0 === n || null === (r = n.persistence) || void 0 === r ? void 0 : r.props[Si]) || [];
        if (qh.SURVEY_SHOWN_EVENT_NAME == e && t && i.length > 0) {
            var o, s = null == t || null === (o = t.properties) || void 0 === o ? void 0 : o.$survey_id;
            if (s) {
                var a = i.indexOf(s);
                a >= 0 && (i.splice(a, 1), this._updateActivatedSurveys(i))
            }
        } else this.eventToSurveys.has(e) && this._updateActivatedSurveys(i.concat(this.eventToSurveys.get(e) || []))
    }
    onAction(e) {
        var t, n, r = (null === (t = this.instance) || void 0 === t || null === (n = t.persistence) || void 0 === n ? void 0 : n.props[Si]) || [];
        this.actionToSurveys.has(e) && this._updateActivatedSurveys(r.concat(this.actionToSurveys.get(e) || []))
    }
    _updateActivatedSurveys(e) {
        var t, n;
        null === (t = this.instance) || void 0 === t || null === (n = t.persistence) || void 0 === n || n.register({
            [Si]: [...new Set(e)]
        })
    }
    getSurveys() {
        var e, t, n = null === (e = this.instance) || void 0 === e || null === (t = e.persistence) || void 0 === t ? void 0 : t.props[Si];
        return n || []
    }
    getEventToSurveys() {
        return this.eventToSurveys
    }
    _getActionMatcher() {
        return this.actionMatcher
    }
}
i(qh, "SURVEY_SHOWN_EVENT_NAME", "survey shown");
var Hh = Ar("[Surveys]"),
    $h = {
        icontains: e => !!Vn && Vn.location.href.toLowerCase().indexOf(e.toLowerCase()) > -1,
        not_icontains: e => !!Vn && -1 === Vn.location.href.toLowerCase().indexOf(e.toLowerCase()),
        regex: e => !!Vn && Ur(Vn.location.href, e),
        not_regex: e => !!Vn && !Ur(Vn.location.href, e),
        exact: e => (null == Vn ? void 0 : Vn.location.href) === e,
        is_not: e => (null == Vn ? void 0 : Vn.location.href) !== e
    };
class Wh {
    constructor(e) {
        this.instance = e, this._surveyEventReceiver = null
    }
    onRemoteConfig(e) {
        this._decideServerResponse = !!e.surveys, this.loadIfEnabled()
    }
    reset() {
        localStorage.removeItem("lastSeenSurveyDate");
        var e = (() => {
            for (var e = [], t = 0; t < localStorage.length; t++) {
                var n = localStorage.key(t);
                null != n && n.startsWith(Ks) && e.push(n)
            }
            return e
        })();
        e.forEach((e => localStorage.removeItem(e)))
    }
    loadIfEnabled() {
        var e, t, n, r = null == tr || null === (e = tr.__PosthogExtensions__) || void 0 === e ? void 0 : e.generateSurveys;
        this.instance.config.disable_surveys || !this._decideServerResponse || r || (null == this._surveyEventReceiver && (this._surveyEventReceiver = new qh(this.instance)), null === (t = tr.__PosthogExtensions__) || void 0 === t || null === (n = t.loadExternalDependency) || void 0 === n || n.call(t, this.instance, "surveys", (e => {
            var t, n;
            if (e) return Hh.error("Could not load surveys script", e);
            this._surveyManager = null === (t = tr.__PosthogExtensions__) || void 0 === t || null === (n = t.generateSurveys) || void 0 === n ? void 0 : n.call(t, this.instance)
        })))
    }
    getSurveys(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (this.instance.config.disable_surveys) return e([]);
        null == this._surveyEventReceiver && (this._surveyEventReceiver = new qh(this.instance));
        var n = this.instance.get_property(wi);
        if (n && !t) return e(n);
        this.instance._send_request({
            url: this.instance.requestRouter.endpointFor("api", "/api/surveys/?token=".concat(this.instance.config.token)),
            method: "GET",
            callback: t => {
                var n;
                if (200 !== t.statusCode || !t.json) return e([]);
                var r, i = t.json.surveys || [],
                    o = i.filter((e => {
                        var t, n, r, i, o, s, a, l, c, u, d, h;
                        return (null === (t = e.conditions) || void 0 === t ? void 0 : t.events) && (null === (n = e.conditions) || void 0 === n || null === (r = n.events) || void 0 === r ? void 0 : r.values) && (null === (i = e.conditions) || void 0 === i || null === (o = i.events) || void 0 === o || null === (s = o.values) || void 0 === s ? void 0 : s.length) > 0 || (null === (a = e.conditions) || void 0 === a ? void 0 : a.actions) && (null === (l = e.conditions) || void 0 === l || null === (c = l.actions) || void 0 === c ? void 0 : c.values) && (null === (u = e.conditions) || void 0 === u || null === (d = u.actions) || void 0 === d || null === (h = d.values) || void 0 === h ? void 0 : h.length) > 0
                    }));
                o.length > 0 && (null === (r = this._surveyEventReceiver) || void 0 === r || r.register(o));
                return null === (n = this.instance.persistence) || void 0 === n || n.register({
                    [wi]: i
                }), e(i)
            }
        })
    }
    getActiveMatchingSurveys(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        this.getSurveys((t => {
            var n, r = t.filter((e => !(!e.start_date || e.end_date))).filter((e => {
                    var t, n, r, i;
                    if (!e.conditions) return !0;
                    var o = null === (t = e.conditions) || void 0 === t || !t.url || $h[null !== (n = null === (r = e.conditions) || void 0 === r ? void 0 : r.urlMatchType) && void 0 !== n ? n : "icontains"](e.conditions.url),
                        s = null === (i = e.conditions) || void 0 === i || !i.selector || (null == Yn ? void 0 : Yn.querySelector(e.conditions.selector));
                    return o && s
                })),
                i = null === (n = this._surveyEventReceiver) || void 0 === n ? void 0 : n.getSurveys(),
                o = r.filter((e => {
                    var t, n, r, o, s, a, l, c, u, d, h;
                    if (!(e.linked_flag_key || e.targeting_flag_key || e.internal_targeting_flag_key || null !== (t = e.feature_flag_keys) && void 0 !== t && t.length)) return !0;
                    var p = !e.linked_flag_key || this.instance.featureFlags.isFeatureEnabled(e.linked_flag_key),
                        v = !e.targeting_flag_key || this.instance.featureFlags.isFeatureEnabled(e.targeting_flag_key),
                        g = (null === (n = e.conditions) || void 0 === n ? void 0 : n.events) && (null === (r = e.conditions) || void 0 === r || null === (o = r.events) || void 0 === o ? void 0 : o.values) && (null === (s = e.conditions) || void 0 === s || null === (a = s.events) || void 0 === a ? void 0 : a.values.length) > 0,
                        f = (null === (l = e.conditions) || void 0 === l ? void 0 : l.actions) && (null === (c = e.conditions) || void 0 === c || null === (u = c.actions) || void 0 === u ? void 0 : u.values) && (null === (d = e.conditions) || void 0 === d || null === (h = d.actions) || void 0 === h ? void 0 : h.values.length) > 0,
                        m = !g && !f || (null == i ? void 0 : i.includes(e.id)),
                        _ = this._canActivateRepeatedly(e),
                        y = !(e.internal_targeting_flag_key && !_) || this.instance.featureFlags.isFeatureEnabled(e.internal_targeting_flag_key),
                        b = this.checkFlags(e);
                    return p && v && y && m && b
                }));
            return e(o)
        }), t)
    }
    checkFlags(e) {
        var t;
        return null === (t = e.feature_flag_keys) || void 0 === t || !t.length || e.feature_flag_keys.every((e => {
            var {
                key: t,
                value: n
            } = e;
            return !t || !n || this.instance.featureFlags.isFeatureEnabled(n)
        }))
    }
    getNextSurveyStep(e, t, n) {
        var r, i = e.questions[t],
            o = t + 1;
        if (null === (r = i.branching) || void 0 === r || !r.type) return t === e.questions.length - 1 ? Ho.End : o;
        if (i.branching.type === Ho.End) return Ho.End;
        if (i.branching.type === Ho.SpecificQuestion) {
            if (Number.isInteger(i.branching.index)) return i.branching.index
        } else if (i.branching.type === Ho.ResponseBased) {
            if (i.type === qo.SingleChoice) {
                var s, a, l = i.choices.indexOf("".concat(n));
                if (null !== (s = i.branching) && void 0 !== s && null !== (a = s.responseValues) && void 0 !== a && a.hasOwnProperty(l)) {
                    var c = i.branching.responseValues[l];
                    return Number.isInteger(c) ? c : c === Ho.End ? Ho.End : o
                }
            } else if (i.type === qo.Rating) {
                var u, d;
                if ("number" != typeof n || !Number.isInteger(n)) throw new Error("The response type must be an integer");
                var h = function(e, t) {
                    if (3 === t) {
                        if (e < 1 || e > 3) throw new Error("The response must be in range 1-3");
                        return 1 === e ? "negative" : 2 === e ? "neutral" : "positive"
                    }
                    if (5 === t) {
                        if (e < 1 || e > 5) throw new Error("The response must be in range 1-5");
                        return e <= 2 ? "negative" : 3 === e ? "neutral" : "positive"
                    }
                    if (7 === t) {
                        if (e < 1 || e > 7) throw new Error("The response must be in range 1-7");
                        return e <= 3 ? "negative" : 4 === e ? "neutral" : "positive"
                    }
                    if (10 === t) {
                        if (e < 0 || e > 10) throw new Error("The response must be in range 0-10");
                        return e <= 6 ? "detractors" : e <= 8 ? "passives" : "promoters"
                    }
                    throw new Error("The scale must be one of: 3, 5, 7, 10")
                }(n, i.scale);
                if (null !== (u = i.branching) && void 0 !== u && null !== (d = u.responseValues) && void 0 !== d && d.hasOwnProperty(h)) {
                    var p = i.branching.responseValues[h];
                    return Number.isInteger(p) ? p : p === Ho.End ? Ho.End : o
                }
            }
            return o
        }
        return Hh.warn("Falling back to next question index due to unexpected branching type"), o
    }
    _canActivateRepeatedly(e) {
        var t;
        return Sr(null === (t = tr.__PosthogExtensions__) || void 0 === t ? void 0 : t.canActivateRepeatedly) ? (Hh.warn("init was not called"), !1) : tr.__PosthogExtensions__.canActivateRepeatedly(e)
    }
    canRenderSurvey(e) {
        Sr(this._surveyManager) ? Hh.warn("init was not called") : this.getSurveys((t => {
            var n = t.filter((t => t.id === e))[0];
            this._surveyManager.canRenderSurvey(n)
        }))
    }
    renderSurvey(e, t) {
        Sr(this._surveyManager) ? Hh.warn("init was not called") : this.getSurveys((n => {
            var r = n.filter((t => t.id === e))[0];
            this._surveyManager.renderSurvey(r, null == Yn ? void 0 : Yn.querySelector(t))
        }))
    }
}
var Vh = Ar("[RateLimiter]");
class Zh {
    constructor(e) {
        var t, n;
        i(this, "serverLimits", {}), i(this, "lastEventRateLimited", !1), i(this, "checkForLimiting", (e => {
            var t = e.text;
            if (t && t.length) try {
                (JSON.parse(t).quota_limited || []).forEach((e => {
                    Vh.info("".concat(e || "events", " is quota limited.")), this.serverLimits[e] = (new Date).getTime() + 6e4
                }))
            } catch (e) {
                return void Vh.warn('could not rate limit - continuing. Error: "'.concat(null == e ? void 0 : e.message, '"'), {
                    text: t
                })
            }
        })), this.instance = e, this.captureEventsPerSecond = (null === (t = e.config.rate_limiting) || void 0 === t ? void 0 : t.events_per_second) || 10, this.captureEventsBurstLimit = Math.max((null === (n = e.config.rate_limiting) || void 0 === n ? void 0 : n.events_burst_limit) || 10 * this.captureEventsPerSecond, this.captureEventsPerSecond), this.lastEventRateLimited = this.clientRateLimitContext(!0).isRateLimited
    }
    clientRateLimitContext() {
        var e, t, n, r = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            i = (new Date).getTime(),
            o = null !== (e = null === (t = this.instance.persistence) || void 0 === t ? void 0 : t.get_property(Ei)) && void 0 !== e ? e : {
                tokens: this.captureEventsBurstLimit,
                last: i
            };
        o.tokens += (i - o.last) / 1e3 * this.captureEventsPerSecond, o.last = i, o.tokens > this.captureEventsBurstLimit && (o.tokens = this.captureEventsBurstLimit);
        var s = o.tokens < 1;
        return s || r || (o.tokens = Math.max(0, o.tokens - 1)), !s || this.lastEventRateLimited || r || this.instance.capture("$$client_ingestion_warning", {
            $$client_ingestion_warning_message: "posthog-js client rate limited. Config is set to ".concat(this.captureEventsPerSecond, " events per second and ").concat(this.captureEventsBurstLimit, " events burst limit.")
        }, {
            skip_client_rate_limiting: !0
        }), this.lastEventRateLimited = s, null === (n = this.instance.persistence) || void 0 === n || n.set_property(Ei, o), {
            isRateLimited: s,
            remainingTokens: o.tokens
        }
    }
    isServerRateLimited(e) {
        var t = this.serverLimits[e || "events"] || !1;
        return !1 !== t && (new Date).getTime() < t
    }
}
var Gh = e => {
    var n = null == e ? void 0 : e.config;
    return t({
        initialPathName: (null == Xn ? void 0 : Xn.pathname) || "",
        referringDomain: ad.referringDomain()
    }, ad.campaignParams({
        customTrackedParams: null == n ? void 0 : n.custom_campaign_params,
        maskPersonalDataProperties: null == n ? void 0 : n.mask_personal_data_properties,
        customPersonalDataProperties: null == n ? void 0 : n.custom_personal_data_properties
    }))
};
class Uh {
    constructor(e, t, n, r) {
        i(this, "_onSessionIdCallback", (e => {
            var t = this._getStoredProps();
            if (!t || t.sessionId !== e) {
                var n = {
                    sessionId: e,
                    props: this._sessionSourceParamGenerator(this.instance)
                };
                this._persistence.register({
                    [ki]: n
                })
            }
        })), this.instance = e, this._sessionIdManager = t, this._persistence = n, this._sessionSourceParamGenerator = r || Gh, this._sessionIdManager.onSessionId(this._onSessionIdCallback)
    }
    _getStoredProps() {
        return this._persistence.props[ki]
    }
    getSessionProps() {
        var e, t = null === (e = this._getStoredProps()) || void 0 === e ? void 0 : e.props;
        return t ? {
            $client_session_initial_referring_host: t.referringDomain,
            $client_session_initial_pathname: t.initialPathName,
            $client_session_initial_utm_source: t.utm_source,
            $client_session_initial_utm_campaign: t.utm_campaign,
            $client_session_initial_utm_medium: t.utm_medium,
            $client_session_initial_utm_content: t.utm_content,
            $client_session_initial_utm_term: t.utm_term
        } : {}
    }
}
var jh = ["ahrefsbot", "ahrefssiteaudit", "applebot", "baiduspider", "better uptime bot", "bingbot", "bingpreview", "bot.htm", "bot.php", "crawler", "deepscan", "duckduckbot", "facebookexternal", "facebookcatalog", "gptbot", "http://yandex.com/bots", "hubspot", "ia_archiver", "linkedinbot", "mj12bot", "msnbot", "nessus", "petalbot", "pinterest", "prerender", "rogerbot", "screaming frog", "semrushbot", "sitebulb", "slurp", "turnitin", "twitterbot", "vercelbot", "yahoo! slurp", "yandexbot", "headlesschrome", "cypress", "Google-HotelAdsVerifier", "adsbot-google", "apis-google", "duplexweb-google", "feedfetcher-google", "google favicon", "google web preview", "google-read-aloud", "googlebot", "googleweblight", "mediapartners-google", "storebot-google", "Bytespider;"],
    zh = function(e, t) {
        if (!e) return !1;
        var n = e.toLowerCase();
        return jh.concat(t || []).some((e => {
            var t = e.toLowerCase();
            return -1 !== n.indexOf(t)
        }))
    },
    Yh = function(e, t) {
        if (!e) return !1;
        var n = e.userAgent;
        if (n && zh(n, t)) return !0;
        try {
            var r = null == e ? void 0 : e.userAgentData;
            if (null != r && r.brands && r.brands.some((e => zh(null == e ? void 0 : e.brand, t)))) return !0
        } catch (e) {}
        return !!e.webdriver
    },
    Xh = Ar("[Dead Clicks]"),
    Jh = () => !0,
    Kh = e => {
        var t, n = !(null === (t = e.instance.persistence) || void 0 === t || !t.get_property(ii)),
            r = e.instance.config.capture_dead_clicks;
        return Ir(r) ? r : n
    };
class Qh {
    get lazyLoadedDeadClicksAutocapture() {
        return this._lazyLoadedDeadClicksAutocapture
    }
    constructor(e, t, n) {
        this.instance = e, this.isEnabled = t, this.onCapture = n, this.startIfEnabled()
    }
    onRemoteConfig(e) {
        this.instance.persistence && this.instance.persistence.register({
            [ii]: null == e ? void 0 : e.captureDeadClicks
        }), this.startIfEnabled()
    }
    startIfEnabled() {
        this.isEnabled(this) && this.loadScript((() => {
            this.start()
        }))
    }
    loadScript(e) {
        var t, n, r;
        null !== (t = tr.__PosthogExtensions__) && void 0 !== t && t.initDeadClicksAutocapture && e(), null === (n = tr.__PosthogExtensions__) || void 0 === n || null === (r = n.loadExternalDependency) || void 0 === r || r.call(n, this.instance, "dead-clicks-autocapture", (t => {
            t ? Xh.error("failed to load script", t) : e()
        }))
    }
    start() {
        var e;
        if (Yn) {
            if (!this._lazyLoadedDeadClicksAutocapture && null !== (e = tr.__PosthogExtensions__) && void 0 !== e && e.initDeadClicksAutocapture) {
                var t = fr(this.instance.config.capture_dead_clicks) ? this.instance.config.capture_dead_clicks : {};
                t.__onCapture = this.onCapture, this._lazyLoadedDeadClicksAutocapture = tr.__PosthogExtensions__.initDeadClicksAutocapture(this.instance, t), this._lazyLoadedDeadClicksAutocapture.start(Yn), Xh.info("starting...")
            }
        } else Xh.error("`document` not found. Cannot start.")
    }
    stop() {
        this._lazyLoadedDeadClicksAutocapture && (this._lazyLoadedDeadClicksAutocapture.stop(), this._lazyLoadedDeadClicksAutocapture = void 0, Xh.info("stopping..."))
    }
}
var ep = Ar("[Heatmaps]");

function tp(e) {
    return fr(e) && "clientX" in e && "clientY" in e && Cr(e.clientX) && Cr(e.clientY)
}
class np {
    constructor(e) {
        var t;
        i(this, "rageclicks", new Ic), i(this, "_enabledServerSide", !1), i(this, "_initialized", !1), i(this, "_flushInterval", null), this.instance = e, this._enabledServerSide = !(null === (t = this.instance.persistence) || void 0 === t || !t.props[ti]), null == Vn || Vn.addEventListener("beforeunload", (() => {
            this.flush()
        }))
    }
    get flushIntervalMilliseconds() {
        var e = 5e3;
        return fr(this.instance.config.capture_heatmaps) && this.instance.config.capture_heatmaps.flush_interval_milliseconds && (e = this.instance.config.capture_heatmaps.flush_interval_milliseconds), e
    }
    get isEnabled() {
        return _r(this.instance.config.capture_heatmaps) ? _r(this.instance.config.enable_heatmaps) ? this._enabledServerSide : this.instance.config.enable_heatmaps : !1 !== this.instance.config.capture_heatmaps
    }
    startIfEnabled() {
        if (this.isEnabled) {
            if (this._initialized) return;
            ep.info("starting..."), this._setupListeners(), this._flushInterval = setInterval(this.flush.bind(this), this.flushIntervalMilliseconds)
        } else {
            var e, t;
            clearInterval(null !== (e = this._flushInterval) && void 0 !== e ? e : void 0), null === (t = this.deadClicksCapture) || void 0 === t || t.stop(), this.getAndClearBuffer()
        }
    }
    onRemoteConfig(e) {
        var t = !!e.heatmaps;
        this.instance.persistence && this.instance.persistence.register({
            [ti]: t
        }), this._enabledServerSide = t, this.startIfEnabled()
    }
    getAndClearBuffer() {
        var e = this.buffer;
        return this.buffer = void 0, e
    }
    _onDeadClick(e) {
        this._onClick(e.originalEvent, "deadclick")
    }
    _setupListeners() {
        Vn && Yn && (Wr(Yn, "click", (e => this._onClick(e || (null == Vn ? void 0 : Vn.event))), !1, !0), Wr(Yn, "mousemove", (e => this._onMouseMove(e || (null == Vn ? void 0 : Vn.event))), !1, !0), this.deadClicksCapture = new Qh(this.instance, Jh, this._onDeadClick.bind(this)), this.deadClicksCapture.startIfEnabled(), this._initialized = !0)
    }
    _getProperties(e, t) {
        var n = this.instance.scrollManager.scrollY(),
            r = this.instance.scrollManager.scrollX(),
            i = this.instance.scrollManager.scrollElement(),
            o = function(e, t, n) {
                for (var r = e; r && Pi(r) && !Li(r, "body");) {
                    if (r === n) return !1;
                    if (or(t, null == Vn ? void 0 : Vn.getComputedStyle(r).position)) return !0;
                    r = Ui(r)
                }
                return !1
            }(Zi(e), ["fixed", "sticky"], i);
        return {
            x: e.clientX + (o ? 0 : r),
            y: e.clientY + (o ? 0 : n),
            target_fixed: o,
            type: t
        }
    }
    _onClick(e) {
        var n, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "click";
        if (!Oi(e.target) && tp(e)) {
            var i = this._getProperties(e, r);
            null !== (n = this.rageclicks) && void 0 !== n && n.isRageClick(e.clientX, e.clientY, (new Date).getTime()) && this._capture(t(t({}, i), {}, {
                type: "rageclick"
            })), this._capture(i)
        }
    }
    _onMouseMove(e) {
        !Oi(e.target) && tp(e) && (clearTimeout(this._mouseMoveTimeout), this._mouseMoveTimeout = setTimeout((() => {
            this._capture(this._getProperties(e, "mousemove"))
        }), 500))
    }
    _capture(e) {
        if (Vn) {
            var t = Vn.location.href;
            this.buffer = this.buffer || {}, this.buffer[t] || (this.buffer[t] = []), this.buffer[t].push(e)
        }
    }
    flush() {
        this.buffer && !mr(this.buffer) && this.instance.capture("$$heatmap", {
            $heatmap_data: this.getAndClearBuffer()
        })
    }
}
class rp {
    constructor(e) {
        i(this, "_updateScrollData", (() => {
            var e, t, n, r;
            this.context || (this.context = {});
            var i = this.scrollElement(),
                o = this.scrollY(),
                s = i ? Math.max(0, i.scrollHeight - i.clientHeight) : 0,
                a = o + ((null == i ? void 0 : i.clientHeight) || 0),
                l = (null == i ? void 0 : i.scrollHeight) || 0;
            this.context.lastScrollY = Math.ceil(o), this.context.maxScrollY = Math.max(o, null !== (e = this.context.maxScrollY) && void 0 !== e ? e : 0), this.context.maxScrollHeight = Math.max(s, null !== (t = this.context.maxScrollHeight) && void 0 !== t ? t : 0), this.context.lastContentY = a, this.context.maxContentY = Math.max(a, null !== (n = this.context.maxContentY) && void 0 !== n ? n : 0), this.context.maxContentHeight = Math.max(l, null !== (r = this.context.maxContentHeight) && void 0 !== r ? r : 0)
        })), this.instance = e
    }
    getContext() {
        return this.context
    }
    resetContext() {
        var e = this.context;
        return setTimeout(this._updateScrollData, 0), e
    }
    startMeasuringScrollPosition() {
        null == Vn || Vn.addEventListener("scroll", this._updateScrollData, !0), null == Vn || Vn.addEventListener("scrollend", this._updateScrollData, !0), null == Vn || Vn.addEventListener("resize", this._updateScrollData)
    }
    scrollElement() {
        if (!this.instance.config.scroll_root_selector) return null == Vn ? void 0 : Vn.document.documentElement;
        var e = hr(this.instance.config.scroll_root_selector) ? this.instance.config.scroll_root_selector : [this.instance.config.scroll_root_selector];
        for (var t of e) {
            var n = null == Vn ? void 0 : Vn.document.querySelector(t);
            if (n) return n
        }
    }
    scrollY() {
        if (this.instance.config.scroll_root_selector) {
            var e = this.scrollElement();
            return e && e.scrollTop || 0
        }
        return Vn && (Vn.scrollY || Vn.pageYOffset || Vn.document.documentElement.scrollTop) || 0
    }
    scrollX() {
        if (this.instance.config.scroll_root_selector) {
            var e = this.scrollElement();
            return e && e.scrollLeft || 0
        }
        return Vn && (Vn.scrollX || Vn.pageXOffset || Vn.document.documentElement.scrollLeft) || 0
    }
}
var ip = Ar("[TracingHeaders]");
class op {
    constructor(e) {
        i(this, "_restoreXHRPatch", void 0), i(this, "_restoreFetchPatch", void 0), i(this, "_startCapturing", (() => {
            var e, t, n, r;
            _r(this._restoreXHRPatch) && (null === (e = tr.__PosthogExtensions__) || void 0 === e || null === (t = e.tracingHeadersPatchFns) || void 0 === t || t._patchXHR(this.instance.sessionManager));
            _r(this._restoreFetchPatch) && (null === (n = tr.__PosthogExtensions__) || void 0 === n || null === (r = n.tracingHeadersPatchFns) || void 0 === r || r._patchFetch(this.instance.sessionManager))
        })), this.instance = e
    }
    _loadScript(e) {
        var t, n, r;
        null !== (t = tr.__PosthogExtensions__) && void 0 !== t && t.tracingHeadersPatchFns && e(), null === (n = tr.__PosthogExtensions__) || void 0 === n || null === (r = n.loadExternalDependency) || void 0 === r || r.call(n, this.instance, "tracing-headers", (t => {
            if (t) return ip.error("failed to load script", t);
            e()
        }))
    }
    startIfEnabledOrStop() {
        var e, t;
        this.instance.config.__add_tracing_headers ? this._loadScript(this._startCapturing) : (null === (e = this._restoreXHRPatch) || void 0 === e || e.call(this), null === (t = this._restoreFetchPatch) || void 0 === t || t.call(this), this._restoreXHRPatch = void 0, this._restoreFetchPatch = void 0)
    }
}
var sp;
! function(e) {
    e[e.PENDING = -1] = "PENDING", e[e.DENIED = 0] = "DENIED", e[e.GRANTED = 1] = "GRANTED"
}(sp || (sp = {}));
class ap {
    constructor(e) {
        this.instance = e
    }
    get config() {
        return this.instance.config
    }
    get consent() {
        return this.getDnt() ? sp.DENIED : this.storedConsent
    }
    isOptedOut() {
        return this.consent === sp.DENIED || this.consent === sp.PENDING && this.config.opt_out_capturing_by_default
    }
    isOptedIn() {
        return !this.isOptedOut()
    }
    optInOut(e) {
        this.storage.set(this.storageKey, e ? 1 : 0, this.config.cookie_expiration, this.config.cross_subdomain_cookie, this.config.secure_cookie)
    }
    reset() {
        this.storage.remove(this.storageKey, this.config.cross_subdomain_cookie)
    }
    get storageKey() {
        var {
            token: e,
            opt_out_capturing_cookie_prefix: t
        } = this.instance.config;
        return (t || "__ph_opt_in_out_") + e
    }
    get storedConsent() {
        var e = this.storage.get(this.storageKey);
        return "1" === e ? sp.GRANTED : "0" === e ? sp.DENIED : sp.PENDING
    }
    get storage() {
        if (!this._storage) {
            var e = this.config.opt_out_capturing_persistence_type;
            this._storage = "localStorage" === e ? tu : Qc;
            var t = "localStorage" === e ? Qc : tu;
            t.get(this.storageKey) && (this._storage.get(this.storageKey) || this.optInOut("1" === t.get(this.storageKey)), t.remove(this.storageKey, this.config.cross_subdomain_cookie))
        }
        return this._storage
    }
    getDnt() {
        return !!this.config.respect_dnt && !!Vr([null == zn ? void 0 : zn.doNotTrack, null == zn ? void 0 : zn.msDoNotTrack, tr.doNotTrack], (e => or([!0, 1, "1", "yes"], e)))
    }
}
var lp = Ar("[ExceptionAutocapture]");
class cp {
    constructor(e) {
        var t;
        i(this, "originalOnUnhandledRejectionHandler", void 0), i(this, "startCapturing", (() => {
            var e, t, n, r;
            if (Vn && this.isEnabled && !this.hasHandlers && !this.isCapturing) {
                var i = null === (e = tr.__PosthogExtensions__) || void 0 === e || null === (t = e.errorWrappingFunctions) || void 0 === t ? void 0 : t.wrapOnError,
                    o = null === (n = tr.__PosthogExtensions__) || void 0 === n || null === (r = n.errorWrappingFunctions) || void 0 === r ? void 0 : r.wrapUnhandledRejection;
                if (i && o) try {
                    this.unwrapOnError = i(this.captureException.bind(this)), this.unwrapUnhandledRejection = o(this.captureException.bind(this))
                } catch (e) {
                    lp.error("failed to start", e), this.stopCapturing()
                } else lp.error("failed to load error wrapping functions - cannot start")
            }
        })), this.instance = e, this.remoteEnabled = !(null === (t = this.instance.persistence) || void 0 === t || !t.props[ni]), this.startIfEnabled()
    }
    get isEnabled() {
        var e;
        return null !== (e = this.remoteEnabled) && void 0 !== e && e
    }
    get isCapturing() {
        var e;
        return !(null == Vn || null === (e = Vn.onerror) || void 0 === e || !e.__POSTHOG_INSTRUMENTED__)
    }
    get hasHandlers() {
        return this.originalOnUnhandledRejectionHandler || this.unwrapOnError
    }
    startIfEnabled() {
        this.isEnabled && !this.isCapturing && (lp.info("enabled, starting..."), this.loadScript(this.startCapturing))
    }
    loadScript(e) {
        var t, n;
        this.hasHandlers && e(), null === (t = tr.__PosthogExtensions__) || void 0 === t || null === (n = t.loadExternalDependency) || void 0 === n || n.call(t, this.instance, "exception-autocapture", (t => {
            if (t) return lp.error("failed to load script", t);
            e()
        }))
    }
    stopCapturing() {
        var e, t;
        null === (e = this.unwrapOnError) || void 0 === e || e.call(this), null === (t = this.unwrapUnhandledRejection) || void 0 === t || t.call(this)
    }
    onRemoteConfig(e) {
        var t = e.autocaptureExceptions;
        this.remoteEnabled = !!t || !1, this.instance.persistence && this.instance.persistence.register({
            [ni]: this.remoteEnabled
        }), this.startIfEnabled()
    }
    captureException(e) {
        var t = this.instance.requestRouter.endpointFor("ui");
        e.$exception_personURL = "".concat(t, "/project/").concat(this.instance.config.token, "/person/").concat(this.instance.get_distinct_id()), this.instance.exceptions.sendExceptionEvent(e)
    }
}
var up = Ar("[Web Vitals]"),
    dp = 9e5;
class hp {
    constructor(e) {
        var n;
        i(this, "_enabledServerSide", !1), i(this, "_initialized", !1), i(this, "buffer", {
            url: void 0,
            metrics: [],
            firstMetricTimestamp: void 0
        }), i(this, "_flushToCapture", (() => {
            clearTimeout(this._delayedFlushTimer), 0 !== this.buffer.metrics.length && (this.instance.capture("$web_vitals", this.buffer.metrics.reduce(((e, n) => t(t({}, e), {}, {
                ["$web_vitals_".concat(n.name, "_event")]: t({}, n),
                ["$web_vitals_".concat(n.name, "_value")]: n.value
            })), {})), this.buffer = {
                url: void 0,
                metrics: [],
                firstMetricTimestamp: void 0
            })
        })), i(this, "_addToBuffer", (e => {
            var n, r = null === (n = this.instance.sessionManager) || void 0 === n ? void 0 : n.checkAndGetSessionAndWindowId(!0);
            if (_r(r)) up.error("Could not read session ID. Dropping metrics!");
            else {
                this.buffer = this.buffer || {
                    url: void 0,
                    metrics: [],
                    firstMetricTimestamp: void 0
                };
                var i = this._currentURL();
                if (!_r(i))
                    if (Sr(null == e ? void 0 : e.name) || Sr(null == e ? void 0 : e.value)) up.error("Invalid metric received", e);
                    else if (this._maxAllowedValue && e.value >= this._maxAllowedValue) up.error("Ignoring metric with value >= " + this._maxAllowedValue, e);
                else this.buffer.url !== i && (this._flushToCapture(), this._delayedFlushTimer = setTimeout(this._flushToCapture, this.flushToCaptureTimeoutMs)), _r(this.buffer.url) && (this.buffer.url = i), this.buffer.firstMetricTimestamp = _r(this.buffer.firstMetricTimestamp) ? Date.now() : this.buffer.firstMetricTimestamp, e.attribution && e.attribution.interactionTargetElement && (e.attribution.interactionTargetElement = void 0), this.buffer.metrics.push(t(t({}, e), {}, {
                    $current_url: i,
                    $session_id: r.sessionId,
                    $window_id: r.windowId,
                    timestamp: Date.now()
                })), this.buffer.metrics.length === this.allowedMetrics.length && this._flushToCapture()
            }
        })), i(this, "_startCapturing", (() => {
            var e, t, n, r, i = tr.__PosthogExtensions__;
            _r(i) || _r(i.postHogWebVitalsCallbacks) || ({
                onLCP: e,
                onCLS: t,
                onFCP: n,
                onINP: r
            } = i.postHogWebVitalsCallbacks), e && t && n && r ? (this.allowedMetrics.indexOf("LCP") > -1 && e(this._addToBuffer.bind(this)), this.allowedMetrics.indexOf("CLS") > -1 && t(this._addToBuffer.bind(this)), this.allowedMetrics.indexOf("FCP") > -1 && n(this._addToBuffer.bind(this)), this.allowedMetrics.indexOf("INP") > -1 && r(this._addToBuffer.bind(this)), this._initialized = !0) : up.error("web vitals callbacks not loaded - not starting")
        })), this.instance = e, this._enabledServerSide = !(null === (n = this.instance.persistence) || void 0 === n || !n.props[ri]), this.startIfEnabled()
    }
    get allowedMetrics() {
        var e, t, n = fr(this.instance.config.capture_performance) ? null === (e = this.instance.config.capture_performance) || void 0 === e ? void 0 : e.web_vitals_allowed_metrics : void 0;
        return _r(n) ? (null === (t = this.instance.persistence) || void 0 === t ? void 0 : t.props[oi]) || ["CLS", "FCP", "INP", "LCP"] : n
    }
    get flushToCaptureTimeoutMs() {
        return (fr(this.instance.config.capture_performance) ? this.instance.config.capture_performance.web_vitals_delayed_flush_ms : void 0) || 5e3
    }
    get _maxAllowedValue() {
        var e = fr(this.instance.config.capture_performance) && Cr(this.instance.config.capture_performance.__web_vitals_max_value) ? this.instance.config.capture_performance.__web_vitals_max_value : dp;
        return 0 < e && e <= 6e4 ? dp : e
    }
    get isEnabled() {
        var e = fr(this.instance.config.capture_performance) ? this.instance.config.capture_performance.web_vitals : void 0;
        return Ir(e) ? e : this._enabledServerSide
    }
    startIfEnabled() {
        this.isEnabled && !this._initialized && (up.info("enabled, starting..."), this.loadScript(this._startCapturing))
    }
    onRemoteConfig(e) {
        var t = fr(e.capturePerformance) && !!e.capturePerformance.web_vitals,
            n = fr(e.capturePerformance) ? e.capturePerformance.web_vitals_allowed_metrics : void 0;
        this.instance.persistence && (this.instance.persistence.register({
            [ri]: t
        }), this.instance.persistence.register({
            [oi]: n
        })), this._enabledServerSide = t, this.startIfEnabled()
    }
    loadScript(e) {
        var t, n, r;
        null !== (t = tr.__PosthogExtensions__) && void 0 !== t && t.postHogWebVitalsCallbacks && e(), null === (n = tr.__PosthogExtensions__) || void 0 === n || null === (r = n.loadExternalDependency) || void 0 === r || r.call(n, this.instance, "web-vitals", (t => {
            t ? up.error("failed to load script", t) : e()
        }))
    }
    _currentURL() {
        var e = Vn ? Vn.location.href : void 0;
        return e || up.error("Could not determine current URL"), e
    }
}
var pp = {
    icontains: (e, t) => !!Vn && t.href.toLowerCase().indexOf(e.toLowerCase()) > -1,
    not_icontains: (e, t) => !!Vn && -1 === t.href.toLowerCase().indexOf(e.toLowerCase()),
    regex: (e, t) => !!Vn && Ur(t.href, e),
    not_regex: (e, t) => !!Vn && !Ur(t.href, e),
    exact: (e, t) => t.href === e,
    is_not: (e, t) => t.href !== e
};
class vp {
    constructor(e) {
        var t = this;
        i(this, "getWebExperimentsAndEvaluateDisplayLogic", (function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            t.getWebExperiments((e => {
                vp.logInfo("retrieved web experiments from the server"), t._flagToExperiments = new Map, e.forEach((e => {
                    if (e.feature_flag_key) {
                        var n;
                        if (t._flagToExperiments) vp.logInfo("setting flag key ", e.feature_flag_key, " to web experiment ", e), null === (n = t._flagToExperiments) || void 0 === n || n.set(e.feature_flag_key, e);
                        var r = t.instance.getFeatureFlag(e.feature_flag_key);
                        yr(r) && e.variants[r] && t.applyTransforms(e.name, r, e.variants[r].transforms)
                    } else if (e.variants)
                        for (var i in e.variants) {
                            var o = e.variants[i];
                            vp.matchesTestVariant(o) && t.applyTransforms(e.name, i, o.transforms)
                        }
                }))
            }), e)
        })), this.instance = e, this.instance.onFeatureFlags((e => {
            this.onFeatureFlags(e)
        }))
    }
    onFeatureFlags(e) {
        if (this._is_bot()) vp.logInfo("Refusing to render web experiment since the viewer is a likely bot");
        else if (!this.instance.config.disable_web_experiments) {
            if (Sr(this._flagToExperiments)) return this._flagToExperiments = new Map, this.loadIfEnabled(), void this.previewWebExperiment();
            vp.logInfo("applying feature flags", e), e.forEach((e => {
                var t;
                if (this._flagToExperiments && null !== (t = this._flagToExperiments) && void 0 !== t && t.has(e)) {
                    var n, r = this.instance.getFeatureFlag(e),
                        i = null === (n = this._flagToExperiments) || void 0 === n ? void 0 : n.get(e);
                    r && null != i && i.variants[r] && this.applyTransforms(i.name, r, i.variants[r].transforms)
                }
            }))
        }
    }
    previewWebExperiment() {
        var e = vp.getWindowLocation();
        if (null != e && e.search) {
            var t = zr(null == e ? void 0 : e.search, "__experiment_id"),
                n = zr(null == e ? void 0 : e.search, "__experiment_variant");
            t && n && (vp.logInfo("previewing web experiments ".concat(t, " && ").concat(n)), this.getWebExperiments((e => {
                this.showPreviewWebExperiment(parseInt(t), n, e)
            }), !1, !0))
        }
    }
    loadIfEnabled() {
        this.instance.config.disable_web_experiments || this.getWebExperimentsAndEvaluateDisplayLogic()
    }
    getWebExperiments(e, t, n) {
        if (this.instance.config.disable_web_experiments && !n) return e([]);
        var r = this.instance.get_property("$web_experiments");
        if (r && !t) return e(r);
        this.instance._send_request({
            url: this.instance.requestRouter.endpointFor("api", "/api/web_experiments/?token=".concat(this.instance.config.token)),
            method: "GET",
            callback: t => {
                if (200 !== t.statusCode || !t.json) return e([]);
                var n = t.json.experiments || [];
                return e(n)
            }
        })
    }
    showPreviewWebExperiment(e, t, n) {
        var r = n.filter((t => t.id === e));
        r && r.length > 0 && (vp.logInfo("Previewing web experiment [".concat(r[0].name, "] with variant [").concat(t, "]")), this.applyTransforms(r[0].name, t, r[0].variants[t].transforms))
    }
    static matchesTestVariant(e) {
        return !Sr(e.conditions) && (vp.matchUrlConditions(e) && vp.matchUTMConditions(e))
    }
    static matchUrlConditions(e) {
        var t;
        if (Sr(e.conditions) || Sr(null === (t = e.conditions) || void 0 === t ? void 0 : t.url)) return !0;
        var n, r, i, o = vp.getWindowLocation();
        return !!o && (null === (n = e.conditions) || void 0 === n || !n.url || pp[null !== (r = null === (i = e.conditions) || void 0 === i ? void 0 : i.urlMatchType) && void 0 !== r ? r : "icontains"](e.conditions.url, o))
    }
    static getWindowLocation() {
        return null == Vn ? void 0 : Vn.location
    }
    static matchUTMConditions(e) {
        var t;
        if (Sr(e.conditions) || Sr(null === (t = e.conditions) || void 0 === t ? void 0 : t.utm)) return !0;
        var n = ad.campaignParams();
        if (n.utm_source) {
            var r, i, o, s, a, l, c, u, d, h, p, v, g, f, m, _, y = null === (r = e.conditions) || void 0 === r || null === (i = r.utm) || void 0 === i || !i.utm_campaign || (null === (o = e.conditions) || void 0 === o || null === (s = o.utm) || void 0 === s ? void 0 : s.utm_campaign) == n.utm_campaign,
                b = null === (a = e.conditions) || void 0 === a || null === (l = a.utm) || void 0 === l || !l.utm_source || (null === (c = e.conditions) || void 0 === c || null === (u = c.utm) || void 0 === u ? void 0 : u.utm_source) == n.utm_source,
                w = null === (d = e.conditions) || void 0 === d || null === (h = d.utm) || void 0 === h || !h.utm_medium || (null === (p = e.conditions) || void 0 === p || null === (v = p.utm) || void 0 === v ? void 0 : v.utm_medium) == n.utm_medium,
                S = null === (g = e.conditions) || void 0 === g || null === (f = g.utm) || void 0 === f || !f.utm_term || (null === (m = e.conditions) || void 0 === m || null === (_ = m.utm) || void 0 === _ ? void 0 : _.utm_term) == n.utm_term;
            return y && w && S && b
        }
        return !1
    }
    static logInfo(e) {
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
        Rr.info("[WebExperiments] ".concat(e), n)
    }
    applyTransforms(e, t, n) {
        this._is_bot() ? vp.logInfo("Refusing to render web experiment since the viewer is a likely bot") : "control" !== t ? n.forEach((n => {
            if (n.selector) {
                var r;
                vp.logInfo("applying transform of variant ".concat(t, " for experiment ").concat(e, " "), n);
                var i = null === (r = document) || void 0 === r ? void 0 : r.querySelectorAll(n.selector);
                null == i || i.forEach((e => {
                    var t = e;
                    n.attributes && n.attributes.forEach((e => {
                        switch (e.name) {
                            case "text":
                                t.innerText = e.value;
                                break;
                            case "html":
                                t.innerHTML = e.value;
                                break;
                            case "cssClass":
                                t.className = e.value;
                                break;
                            default:
                                t.setAttribute(e.name, e.value)
                        }
                    })), n.text && (t.innerText = n.text), n.html && (t.parentElement ? t.parentElement.innerHTML = n.html : t.innerHTML = n.html), n.css && t.setAttribute("style", n.css)
                }))
            }
        })) : vp.logInfo("Control variants leave the page unmodified.")
    }
    _is_bot() {
        return zn && this.instance ? Yh(zn, this.instance.config.custom_blocked_useragents) : void 0
    }
}
class gp {
    constructor(e) {
        this.instance = e
    }
    sendExceptionEvent(e) {
        this.instance.capture("$exception", e, {
            _noTruncate: !0,
            _batchKey: "exceptionEvent"
        })
    }
}
var fp = ["$set_once", "$set"],
    mp = Ar("[SiteApps]");
class _p {
    constructor(e) {
        this.instance = e, this.bufferedInvocations = [], this.apps = {}
    }
    get isEnabled() {
        return !!this.instance.config.opt_in_site_apps
    }
    eventCollector(e, t) {
        if (t) {
            var n = this.globalsForEvent(t);
            this.bufferedInvocations.push(n), this.bufferedInvocations.length > 1e3 && (this.bufferedInvocations = this.bufferedInvocations.slice(10))
        }
    }
    get siteAppLoaders() {
        var e, t;
        return null === (e = tr._POSTHOG_REMOTE_CONFIG) || void 0 === e || null === (t = e[this.instance.config.token]) || void 0 === t ? void 0 : t.siteApps
    }
    init() {
        if (this.isEnabled) {
            var e = this.instance._addCaptureHook(this.eventCollector.bind(this));
            this.stopBuffering = () => {
                e(), this.bufferedInvocations = [], this.stopBuffering = void 0
            }
        }
    }
    globalsForEvent(e) {
        var n, r, i, s, a, l, c;
        if (!e) throw new Error("Event payload is required");
        var u = {},
            d = this.instance.get_property("$groups") || [],
            h = this.instance.get_property("$stored_group_properties") || {};
        for (var [p, v] of Object.entries(h)) u[p] = {
            id: d[p],
            type: p,
            properties: v
        };
        var {
            $set_once: g,
            $set: f
        } = e;
        return {
            event: t(t({}, o(e, fp)), {}, {
                properties: t(t(t({}, e.properties), f ? {
                    $set: t(t({}, null !== (n = null === (r = e.properties) || void 0 === r ? void 0 : r.$set) && void 0 !== n ? n : {}), f)
                } : {}), g ? {
                    $set_once: t(t({}, null !== (i = null === (s = e.properties) || void 0 === s ? void 0 : s.$set_once) && void 0 !== i ? i : {}), g)
                } : {}),
                elements_chain: null !== (a = null === (l = e.properties) || void 0 === l ? void 0 : l.$elements_chain) && void 0 !== a ? a : "",
                distinct_id: null === (c = e.properties) || void 0 === c ? void 0 : c.distinct_id
            }),
            person: {
                properties: this.instance.get_property("$stored_person_properties")
            },
            groups: u
        }
    }
    setupSiteApp(e) {
        var t = {
            id: e.id,
            loaded: !1,
            errored: !1
        };
        this.apps[e.id] = t;
        var n = n => {
            var r;
            for (var i of (this.apps[e.id].errored = !n, this.apps[e.id].loaded = !0, mp.info("Site app with id ".concat(e.id, " ").concat(n ? "loaded" : "errored")), n && this.bufferedInvocations.length && (mp.info("Processing ".concat(this.bufferedInvocations.length, " events for site app with id ").concat(e.id)), this.bufferedInvocations.forEach((e => {
                    var n;
                    return null === (n = t.processEvent) || void 0 === n ? void 0 : n.call(t, e)
                }))), Object.values(this.apps)))
                if (!i.loaded) return;
            null === (r = this.stopBuffering) || void 0 === r || r.call(this)
        };
        try {
            var {
                processEvent: r
            } = e.init({
                posthog: this.instance,
                callback: e => {
                    n(e)
                }
            });
            r && (t.processEvent = r)
        } catch (t) {
            mp.error("Error while initializing PostHog app with config id ".concat(e.id), t), n(!1)
        }
    }
    onCapturedEvent(e) {
        if (0 !== Object.keys(this.apps).length) {
            var t = this.globalsForEvent(e);
            for (var n of Object.values(this.apps)) try {
                var r;
                null === (r = n.processEvent) || void 0 === r || r.call(n, t)
            } catch (t) {
                mp.error("Error while processing event ".concat(e.event, " for site app ").concat(n.id), t)
            }
        }
    }
    onRemoteConfig(e) {
        var t, n, r, i = this;
        if (null !== (t = this.siteAppLoaders) && void 0 !== t && t.length) {
            if (!this.isEnabled) return void mp.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.');
            for (var o of this.siteAppLoaders) this.setupSiteApp(o);
            this.instance.on("eventCaptured", (e => this.onCapturedEvent(e)))
        } else if (null === (n = this.stopBuffering) || void 0 === n || n.call(this), null !== (r = e.siteApps) && void 0 !== r && r.length)
            if (this.isEnabled) {
                var s = function(e, t) {
                    var n, r;
                    tr["__$$ph_site_app_".concat(e)] = i.instance, null === (n = tr.__PosthogExtensions__) || void 0 === n || null === (r = n.loadSiteApp) || void 0 === r || r.call(n, i.instance, t, (t => {
                        if (t) return mp.error("Error while initializing PostHog app with config id ".concat(e), t)
                    }))
                };
                for (var {
                        id: a,
                        url: l
                    }
                    of e.siteApps) s(a, l)
            } else mp.error('PostHog site apps are disabled. Enable the "opt_in_site_apps" config to proceed.')
    }
}

function yp(e, t, n) {
    return wh({
        distinct_id: e,
        userPropertiesToSet: t,
        userPropertiesToSetOnce: n
    })
}
var bp = {},
    wp = () => {},
    Sp = "posthog",
    Cp = !_h && -1 === (null == er ? void 0 : er.indexOf("MSIE")) && -1 === (null == er ? void 0 : er.indexOf("Mozilla")),
    Ip = () => {
        var e, t, n;
        return {
            api_host: "https://us.i.posthog.com",
            ui_host: null,
            token: "",
            autocapture: !0,
            rageclick: !0,
            cross_subdomain_cookie: (t = null == Yn ? void 0 : Yn.location, n = null == t ? void 0 : t.hostname, !!yr(n) && "herokuapp.com" !== n.split(".").slice(-2).join(".")),
            persistence: "localStorage+cookie",
            persistence_name: "",
            loaded: wp,
            store_google: !0,
            custom_campaign_params: [],
            custom_blocked_useragents: [],
            save_referrer: !0,
            capture_pageview: !0,
            capture_pageleave: "if_capture_pageview",
            debug: Xn && yr(null == Xn ? void 0 : Xn.search) && -1 !== Xn.search.indexOf("__posthog_debug=true") || !1,
            verbose: !1,
            cookie_expiration: 365,
            upgrade: !1,
            disable_session_recording: !1,
            disable_persistence: !1,
            disable_web_experiments: !0,
            disable_surveys: !1,
            enable_recording_console_log: void 0,
            secure_cookie: "https:" === (null == Vn || null === (e = Vn.location) || void 0 === e ? void 0 : e.protocol),
            ip: !0,
            opt_out_capturing_by_default: !1,
            opt_out_persistence_by_default: !1,
            opt_out_useragent_filter: !1,
            opt_out_capturing_persistence_type: "localStorage",
            opt_out_capturing_cookie_prefix: null,
            opt_in_site_apps: !1,
            property_denylist: [],
            respect_dnt: !1,
            sanitize_properties: null,
            request_headers: {},
            inapp_protocol: "//",
            inapp_link_new_window: !1,
            request_batching: !0,
            properties_string_max_length: 65535,
            session_recording: {},
            mask_all_element_attributes: !1,
            mask_all_text: !1,
            mask_personal_data_properties: !1,
            custom_personal_data_properties: [],
            advanced_disable_decide: !1,
            advanced_disable_feature_flags: !1,
            advanced_disable_feature_flags_on_first_load: !1,
            advanced_disable_toolbar_metrics: !1,
            feature_flag_request_timeout_ms: 3e3,
            on_request_error: e => {
                var t = "Bad HTTP status: " + e.statusCode + " " + e.text;
                Rr.error(t)
            },
            get_device_id: e => e,
            _onCapture: wp,
            capture_performance: void 0,
            name: "posthog",
            bootstrap: {},
            disable_compression: !1,
            session_idle_timeout_seconds: 1800,
            person_profiles: "identified_only",
            __add_tracing_headers: !1,
            before_send: void 0
        }
    },
    kp = e => {
        var t = {};
        _r(e.process_person) || (t.person_profiles = e.process_person), _r(e.xhr_headers) || (t.request_headers = e.xhr_headers), _r(e.cookie_name) || (t.persistence_name = e.cookie_name), _r(e.disable_cookie) || (t.disable_persistence = e.disable_cookie);
        var n = Pr({}, t, e);
        return hr(e.property_blacklist) && (_r(e.property_denylist) ? n.property_denylist = e.property_blacklist : hr(e.property_denylist) ? n.property_denylist = [...e.property_blacklist, ...e.property_denylist] : Rr.error("Invalid value for property_denylist config: " + e.property_denylist)), n
    };
class Ep {
    constructor() {
        i(this, "__forceAllowLocalhost", !1)
    }
    get _forceAllowLocalhost() {
        return this.__forceAllowLocalhost
    }
    set _forceAllowLocalhost(e) {
        Rr.error("WebPerformanceObserver is deprecated and has no impact on network capture. Use `_forceAllowLocalhostNetworkCapture` on `posthog.sessionRecording`"), this.__forceAllowLocalhost = e
    }
}
class xp {
    get decideEndpointWasHit() {
        var e, t;
        return null !== (e = null === (t = this.featureFlags) || void 0 === t ? void 0 : t.hasLoadedFlags) && void 0 !== e && e
    }
    constructor() {
        i(this, "webPerformance", new Ep), i(this, "version", Tr.LIB_VERSION), i(this, "_internalEventEmitter", new Dh), this.config = Ip(), this.SentryIntegration = Fh, this.sentryIntegration = e => function(e, t) {
            var n = Nh(e, t);
            return {
                name: Ah,
                processEvent: e => n(e)
            }
        }(this, e), this.__request_queue = [], this.__loaded = !1, this.analyticsDefaultEndpoint = "/e/", this._initialPageviewCaptured = !1, this._initialPersonProfilesConfig = null, this._cachedIdentify = null, this.featureFlags = new Hc(this), this.toolbar = new gh(this), this.scrollManager = new rp(this), this.pageViewManager = new Lh(this), this.surveys = new Wh(this), this.experiments = new vp(this), this.exceptions = new gp(this), this.rateLimiter = new Zh(this), this.requestRouter = new Rh(this), this.consent = new ap(this), this.people = {
            set: (e, t, n) => {
                var r = yr(e) ? {
                    [e]: t
                } : e;
                this.setPersonProperties(r), null == n || n({})
            },
            set_once: (e, t, n) => {
                var r = yr(e) ? {
                    [e]: t
                } : e;
                this.setPersonProperties(void 0, r), null == n || n({})
            }
        }, this.on("eventCaptured", (e => Rr.info('send "'.concat(null == e ? void 0 : e.event, '"'), e)))
    }
    init(e, t, n) {
        if (n && n !== Sp) {
            var r, i = null !== (r = bp[n]) && void 0 !== r ? r : new xp;
            return i._init(e, t, n), bp[n] = i, bp[Sp][n] = i, i
        }
        return this._init(e, t, n)
    }
    _init(e) {
        var n, r, i, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            s = arguments.length > 2 ? arguments[2] : void 0;
        if (_r(e) || br(e)) return Rr.critical("PostHog was initialized without a token. This likely indicates a misconfiguration. Please check the first argument passed to posthog.init()"), this;
        if (this.__loaded) return Rr.warn("You have already initialized PostHog! Re-initializing is a no-op"), this;
        this.__loaded = !0, this.config = {}, this._triggered_notifs = [], o.person_profiles && (this._initialPersonProfilesConfig = o.person_profiles), this.set_config(Pr({}, Ip(), kp(o), {
            name: s,
            token: e
        })), this.config.on_xhr_error && Rr.error("on_xhr_error is deprecated. Use on_request_error instead"), this.compression = o.disable_compression ? void 0 : $n.GZipJS, this.persistence = new cd(this.config), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new cd(t(t({}, this.config), {}, {
            persistence: "sessionStorage"
        }));
        var a = t({}, this.persistence.props),
            l = t({}, this.sessionPersistence.props);
        if (this._requestQueue = new fh((e => this._send_retriable_request(e))), this._retryQueue = new kh(this), this.__request_queue = [], this.config.__preview_experimental_cookieless_mode || (this.sessionManager = new Th(this), this.sessionPropsManager = new Uh(this, this.sessionManager, this.persistence)), new op(this).startIfEnabledOrStop(), this.siteApps = new _p(this), null === (n = this.siteApps) || void 0 === n || n.init(), this.config.__preview_experimental_cookieless_mode || (this.sessionRecording = new lh(this), this.sessionRecording.startIfEnabledOrStop()), this.config.disable_scroll_properties || this.scrollManager.startMeasuringScrollPosition(), this.autocapture = new Rc(this), this.autocapture.startIfEnabled(), this.surveys.loadIfEnabled(), this.heatmaps = new np(this), this.heatmaps.startIfEnabled(), this.webVitalsAutocapture = new hp(this), this.exceptionObserver = new cp(this), this.exceptionObserver.startIfEnabled(), this.deadClicksAutocapture = new Qh(this, Kh), this.deadClicksAutocapture.startIfEnabled(), Tr.DEBUG = Tr.DEBUG || this.config.debug, Tr.DEBUG && Rr.info("Starting in debug mode", {
                this: this,
                config: o,
                thisC: t({}, this.config),
                p: a,
                s: l
            }), this._sync_opt_out_with_persistence(), void 0 !== (null === (r = o.bootstrap) || void 0 === r ? void 0 : r.distinctID)) {
            var c, u, d = this.config.get_device_id(jc()),
                h = null !== (c = o.bootstrap) && void 0 !== c && c.isIdentifiedID ? d : o.bootstrap.distinctID;
            this.persistence.set_property(Ii, null !== (u = o.bootstrap) && void 0 !== u && u.isIdentifiedID ? "identified" : "anonymous"), this.register({
                distinct_id: o.bootstrap.distinctID,
                $device_id: h
            })
        }
        if (this._hasBootstrappedFeatureFlags()) {
            var p, v, g = Object.keys((null === (p = o.bootstrap) || void 0 === p ? void 0 : p.featureFlags) || {}).filter((e => {
                    var t, n;
                    return !(null === (t = o.bootstrap) || void 0 === t || null === (n = t.featureFlags) || void 0 === n || !n[e])
                })).reduce(((e, t) => {
                    var n, r;
                    return e[t] = (null === (n = o.bootstrap) || void 0 === n || null === (r = n.featureFlags) || void 0 === r ? void 0 : r[t]) || !1, e
                }), {}),
                f = Object.keys((null === (v = o.bootstrap) || void 0 === v ? void 0 : v.featureFlagPayloads) || {}).filter((e => g[e])).reduce(((e, t) => {
                    var n, r, i, s;
                    null !== (n = o.bootstrap) && void 0 !== n && null !== (r = n.featureFlagPayloads) && void 0 !== r && r[t] && (e[t] = null === (i = o.bootstrap) || void 0 === i || null === (s = i.featureFlagPayloads) || void 0 === s ? void 0 : s[t]);
                    return e
                }), {});
            this.featureFlags.receivedFeatureFlags({
                featureFlags: g,
                featureFlagPayloads: f
            })
        }
        if (this.config.__preview_experimental_cookieless_mode) this.register_once({
            distinct_id: Ni,
            $device_id: null
        }, "");
        else if (!this.get_distinct_id()) {
            var m = this.config.get_device_id(jc());
            this.register_once({
                distinct_id: m,
                $device_id: m
            }, ""), this.persistence.set_property(Ii, "anonymous")
        }
        return null == Vn || null === (i = Vn.addEventListener) || void 0 === i || i.call(Vn, "onpagehide" in self ? "pagehide" : "unload", this._handle_unload.bind(this)), this.toolbar.maybeLoadToolbar(), o.segment ? Ph(this, (() => this._loaded())) : this._loaded(), pr(this.config._onCapture) && this.config._onCapture !== wp && (Rr.warn("onCapture is deprecated. Please use `before_send` instead"), this.on("eventCaptured", (e => this.config._onCapture(e.event, e)))), this
    }
    _onRemoteConfig(e) {
        var t, n, r, i, o, s, a, l, c;
        if (!Yn || !Yn.body) return Rr.info("document not ready yet, trying again in 500 milliseconds..."), void setTimeout((() => {
            this._onRemoteConfig(e)
        }), 500);
        this.compression = void 0, e.supportedCompression && !this.config.disable_compression && (this.compression = or(e.supportedCompression, $n.GZipJS) ? $n.GZipJS : or(e.supportedCompression, $n.Base64) ? $n.Base64 : void 0), null !== (t = e.analytics) && void 0 !== t && t.endpoint && (this.analyticsDefaultEndpoint = e.analytics.endpoint), this.set_config({
            person_profiles: this._initialPersonProfilesConfig ? this._initialPersonProfilesConfig : e.defaultIdentifiedOnly ? "identified_only" : "always"
        }), null === (n = this.siteApps) || void 0 === n || n.onRemoteConfig(e), null === (r = this.sessionRecording) || void 0 === r || r.onRemoteConfig(e), null === (i = this.autocapture) || void 0 === i || i.onRemoteConfig(e), null === (o = this.heatmaps) || void 0 === o || o.onRemoteConfig(e), null === (s = this.surveys) || void 0 === s || s.onRemoteConfig(e), null === (a = this.webVitalsAutocapture) || void 0 === a || a.onRemoteConfig(e), null === (l = this.exceptionObserver) || void 0 === l || l.onRemoteConfig(e), null === (c = this.deadClicksAutocapture) || void 0 === c || c.onRemoteConfig(e)
    }
    _loaded() {
        try {
            this.config.loaded(this)
        } catch (e) {
            Rr.critical("`loaded` function failed", e)
        }
        this._start_queue_if_opted_in(), this.config.capture_pageview && setTimeout((() => {
            this.consent.isOptedIn() && this._captureInitialPageview()
        }), 1), new uh(this).load(), this.featureFlags.decide()
    }
    _start_queue_if_opted_in() {
        var e;
        this.has_opted_out_capturing() || this.config.request_batching && (null === (e = this._requestQueue) || void 0 === e || e.enable())
    }
    _dom_loaded() {
        this.has_opted_out_capturing() || Fr(this.__request_queue, (e => this._send_retriable_request(e))), this.__request_queue = [], this._start_queue_if_opted_in()
    }
    _handle_unload() {
        var e, t;
        this.config.request_batching ? (this._shouldCapturePageleave() && this.capture("$pageleave"), null === (e = this._requestQueue) || void 0 === e || e.unload(), null === (t = this._retryQueue) || void 0 === t || t.unload()) : this._shouldCapturePageleave() && this.capture("$pageleave", null, {
            transport: "sendBeacon"
        })
    }
    _send_request(e) {
        this.__loaded && (Cp ? this.__request_queue.push(e) : this.rateLimiter.isServerRateLimited(e.batchKey) || (e.transport = e.transport || this.config.api_transport, e.url = bh(e.url, {
            ip: this.config.ip ? 1 : 0
        }), e.headers = t({}, this.config.request_headers), e.compression = "best-available" === e.compression ? this.compression : e.compression, e.fetchOptions = e.fetchOptions || this.config.fetch_options, (e => {
            var n, r, i, o = t({}, e);
            o.timeout = o.timeout || 6e4, o.url = bh(o.url, {
                _: (new Date).getTime().toString(),
                ver: Tr.LIB_VERSION,
                compression: o.compression
            });
            var s = null !== (n = o.transport) && void 0 !== n ? n : "fetch",
                a = null !== (r = null === (i = Vr(Ch, (e => e.transport === s))) || void 0 === i ? void 0 : i.method) && void 0 !== r ? r : Ch[0].method;
            if (!a) throw new Error("No available transport method");
            a(o)
        })(t(t({}, e), {}, {
            callback: t => {
                var n, r, i;
                (this.rateLimiter.checkForLimiting(t), t.statusCode >= 400) && (null === (r = (i = this.config).on_request_error) || void 0 === r || r.call(i, t));
                null === (n = e.callback) || void 0 === n || n.call(e, t)
            }
        }))))
    }
    _send_retriable_request(e) {
        this._retryQueue ? this._retryQueue.retriableRequest(e) : this._send_request(e)
    }
    _execute_array(e) {
        var t, n = [],
            r = [],
            i = [];
        Fr(e, (e => {
            e && (t = e[0], hr(t) ? i.push(e) : pr(e) ? e.call(this) : hr(e) && "alias" === t ? n.push(e) : hr(e) && -1 !== t.indexOf("capture") && pr(this[t]) ? i.push(e) : r.push(e))
        }));
        var o = function(e, t) {
            Fr(e, (function(e) {
                if (hr(e[0])) {
                    var n = t;
                    Or(e, (function(e) {
                        n = n[e[0]].apply(n, e.slice(1))
                    }))
                } else this[e[0]].apply(this, e.slice(1))
            }), t)
        };
        o(n, this), o(r, this), o(i, this)
    }
    _hasBootstrappedFeatureFlags() {
        var e, t;
        return (null === (e = this.config.bootstrap) || void 0 === e ? void 0 : e.featureFlags) && Object.keys(null === (t = this.config.bootstrap) || void 0 === t ? void 0 : t.featureFlags).length > 0 || !1
    }
    push(e) {
        this._execute_array([e])
    }
    capture(e, n, r) {
        var i;
        if (this.__loaded && this.persistence && this.sessionPersistence && this._requestQueue) {
            if (!this.consent.isOptedOut())
                if (!_r(e) && yr(e)) {
                    if (this.config.opt_out_useragent_filter || !this._is_bot()) {
                        var o = null != r && r.skip_client_rate_limiting ? void 0 : this.rateLimiter.clientRateLimitContext();
                        if (null == o || !o.isRateLimited) {
                            this.sessionPersistence.update_search_keyword(), this.config.store_google && this.sessionPersistence.update_campaign_params(), this.config.save_referrer && this.sessionPersistence.update_referrer_info(), (this.config.store_google || this.config.save_referrer) && this.persistence.set_initial_person_info();
                            var s = new Date,
                                a = (null == r ? void 0 : r.timestamp) || s,
                                l = jc(),
                                c = {
                                    uuid: l,
                                    event: e,
                                    properties: this._calculate_event_properties(e, n || {}, a, l)
                                };
                            o && (c.properties.$lib_rate_limit_remaining_tokens = o.remainingTokens), (null == r ? void 0 : r.$set) && (c.$set = null == r ? void 0 : r.$set);
                            var u = this._calculate_set_once_properties(null == r ? void 0 : r.$set_once);
                            u && (c.$set_once = u), (c = $r(c, null != r && r._noTruncate ? null : this.config.properties_string_max_length)).timestamp = a, _r(null == r ? void 0 : r.timestamp) || (c.properties.$event_time_override_provided = !0, c.properties.$event_time_override_system_time = s);
                            var d = t(t({}, c.properties.$set), c.$set);
                            if (mr(d) || this.setPersonPropertiesForFlags(d), !Sr(this.config.before_send)) {
                                var h = this._runBeforeSend(c);
                                if (!h) return;
                                c = h
                            }
                            this._internalEventEmitter.emit("eventCaptured", c);
                            var p = {
                                method: "POST",
                                url: null !== (i = null == r ? void 0 : r._url) && void 0 !== i ? i : this.requestRouter.endpointFor("api", this.analyticsDefaultEndpoint),
                                data: c,
                                compression: "best-available",
                                batchKey: null == r ? void 0 : r._batchKey
                            };
                            return !this.config.request_batching || r && (null == r || !r._batchKey) || null != r && r.send_instantly ? this._send_retriable_request(p) : this._requestQueue.enqueue(p), c
                        }
                        Rr.critical("This capture call is ignored due to client rate limiting.")
                    }
                } else Rr.error("No event name provided to posthog.capture")
        } else Rr.uninitializedWarning("posthog.capture")
    }
    _addCaptureHook(e) {
        return this.on("eventCaptured", (t => e(t.event, t)))
    }
    _calculate_event_properties(e, n, r, i) {
        if (r = r || new Date, !this.persistence || !this.sessionPersistence) return n;
        var o = this.persistence.remove_event_timer(e),
            s = t({}, n);
        if (s.token = this.config.token, this.config.__preview_experimental_cookieless_mode && (s.$cookieless_mode = !0), "$snapshot" === e) {
            var a = t(t({}, this.persistence.properties()), this.sessionPersistence.properties());
            return s.distinct_id = a.distinct_id, (!yr(s.distinct_id) && !Cr(s.distinct_id) || br(s.distinct_id)) && Rr.error("Invalid distinct_id for replay event. This indicates a bug in your implementation"), s
        }
        var l, c = ad.properties({
            maskPersonalDataProperties: this.config.mask_personal_data_properties,
            customPersonalDataProperties: this.config.custom_personal_data_properties
        });
        if (this.sessionManager) {
            var {
                sessionId: u,
                windowId: d
            } = this.sessionManager.checkAndGetSessionAndWindowId();
            s.$session_id = u, s.$window_id = d
        }
        if (this.sessionRecording && (s.$recording_status = this.sessionRecording.status), this.requestRouter.region === Eh.CUSTOM && (s.$lib_custom_api_host = this.config.api_host), this.sessionPropsManager && this.config.__preview_send_client_session_params && ("$pageview" === e || "$pageleave" === e || "$autocapture" === e)) {
            var h = this.sessionPropsManager.getSessionProps();
            s = Pr(s, h)
        }
        if (l = "$pageview" === e ? this.pageViewManager.doPageView(r, i) : "$pageleave" === e ? this.pageViewManager.doPageLeave(r) : this.pageViewManager.doEvent(), s = Pr(s, l), "$pageview" === e && Yn && (s.title = Yn.title), !_r(o)) {
            var p = r.getTime() - o;
            s.$duration = parseFloat((p / 1e3).toFixed(3))
        }
        er && this.config.opt_out_useragent_filter && (s.$browser_type = this._is_bot() ? "bot" : "browser"), (s = Pr({}, c, this.persistence.properties(), this.sessionPersistence.properties(), s)).$is_identified = this._isIdentified(), hr(this.config.property_denylist) ? Or(this.config.property_denylist, (function(e) {
            delete s[e]
        })) : Rr.error("Invalid value for property_denylist config: " + this.config.property_denylist + " or property_blacklist config: " + this.config.property_blacklist);
        var v = this.config.sanitize_properties;
        v && (Rr.error("sanitize_properties is deprecated. Use before_send instead"), s = v(s, e));
        var g = this._hasPersonProcessing();
        return s.$process_person_profile = g, g && this._requirePersonProcessing("_calculate_event_properties"), s
    }
    _calculate_set_once_properties(e) {
        if (!this.persistence || !this._hasPersonProcessing()) return e;
        var t = Pr({}, this.persistence.get_initial_props(), e || {}),
            n = this.config.sanitize_properties;
        return n && (Rr.error("sanitize_properties is deprecated. Use before_send instead"), t = n(t, "$set_once")), mr(t) ? void 0 : t
    }
    register(e, t) {
        var n;
        null === (n = this.persistence) || void 0 === n || n.register(e, t)
    }
    register_once(e, t, n) {
        var r;
        null === (r = this.persistence) || void 0 === r || r.register_once(e, t, n)
    }
    register_for_session(e) {
        var t;
        null === (t = this.sessionPersistence) || void 0 === t || t.register(e)
    }
    unregister(e) {
        var t;
        null === (t = this.persistence) || void 0 === t || t.unregister(e)
    }
    unregister_for_session(e) {
        var t;
        null === (t = this.sessionPersistence) || void 0 === t || t.unregister(e)
    }
    _register_single(e, t) {
        this.register({
            [e]: t
        })
    }
    getFeatureFlag(e, t) {
        return this.featureFlags.getFeatureFlag(e, t)
    }
    getFeatureFlagPayload(e) {
        var t = this.featureFlags.getFeatureFlagPayload(e);
        try {
            return JSON.parse(t)
        } catch (e) {
            return t
        }
    }
    isFeatureEnabled(e, t) {
        return this.featureFlags.isFeatureEnabled(e, t)
    }
    reloadFeatureFlags() {
        this.featureFlags.reloadFeatureFlags()
    }
    updateEarlyAccessFeatureEnrollment(e, t) {
        this.featureFlags.updateEarlyAccessFeatureEnrollment(e, t)
    }
    getEarlyAccessFeatures(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return this.featureFlags.getEarlyAccessFeatures(e, t)
    }
    on(e, t) {
        return this._internalEventEmitter.on(e, t)
    }
    onFeatureFlags(e) {
        return this.featureFlags.onFeatureFlags(e)
    }
    onSessionId(e) {
        var t, n;
        return null !== (t = null === (n = this.sessionManager) || void 0 === n ? void 0 : n.onSessionId(e)) && void 0 !== t ? t : () => {}
    }
    getSurveys(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        this.surveys.getSurveys(e, t)
    }
    getActiveMatchingSurveys(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        this.surveys.getActiveMatchingSurveys(e, t)
    }
    renderSurvey(e, t) {
        this.surveys.renderSurvey(e, t)
    }
    canRenderSurvey(e) {
        this.surveys.canRenderSurvey(e)
    }
    getNextSurveyStep(e, t, n) {
        return this.surveys.getNextSurveyStep(e, t, n)
    }
    identify(e, t, n) {
        if (!this.__loaded || !this.persistence) return Rr.uninitializedWarning("posthog.identify");
        if (Cr(e) && (e = e.toString(), Rr.warn("The first argument to posthog.identify was a number, but it should be a string. It has been converted to a string.")), e) {
            if (["distinct_id", "distinctid"].includes(e.toLowerCase())) Rr.critical('The string "'.concat(e, '" was set in posthog.identify which indicates an error. This ID should be unique to the user and not a hardcoded string.'));
            else if (this._requirePersonProcessing("posthog.identify")) {
                var r = this.get_distinct_id();
                if (this.register({
                        $user_id: e
                    }), !this.get_property("$device_id")) {
                    var i = r;
                    this.register_once({
                        $had_persisted_distinct_id: !0,
                        $device_id: i
                    }, "")
                }
                e !== r && e !== this.get_property(Kr) && (this.unregister(Kr), this.register({
                    distinct_id: e
                }));
                var o = "anonymous" === (this.persistence.get_property(Ii) || "anonymous");
                e !== r && o ? (this.persistence.set_property(Ii, "identified"), this.setPersonPropertiesForFlags(t || {}, !1), this.capture("$identify", {
                    distinct_id: e,
                    $anon_distinct_id: r
                }, {
                    $set: t || {},
                    $set_once: n || {}
                }), this.featureFlags.setAnonymousDistinctId(r), this._cachedIdentify = yp(e, t, n)) : (t || n) && (this._cachedIdentify !== yp(e, t, n) ? (this.setPersonProperties(t, n), this._cachedIdentify = yp(e, t, n)) : Rr.info("A duplicate posthog.identify call was made with the same properties. It has been ignored.")), e !== r && (this.reloadFeatureFlags(), this.unregister(Ci))
            }
        } else Rr.error("Unique user id has not been set in posthog.identify")
    }
    setPersonProperties(e, t) {
        (e || t) && this._requirePersonProcessing("posthog.setPersonProperties") && (this.setPersonPropertiesForFlags(e || {}), this.capture("$set", {
            $set: e || {},
            $set_once: t || {}
        }))
    }
    group(e, n, r) {
        if (e && n) {
            if (this._requirePersonProcessing("posthog.group")) {
                var i = this.getGroups();
                i[e] !== n && this.resetGroupPropertiesForFlags(e), this.register({
                    $groups: t(t({}, i), {}, {
                        [e]: n
                    })
                }), r && (this.capture("$groupidentify", {
                    $group_type: e,
                    $group_key: n,
                    $group_set: r
                }), this.setGroupPropertiesForFlags({
                    [e]: r
                })), i[e] === n || r || this.reloadFeatureFlags()
            }
        } else Rr.error("posthog.group requires a group type and group key")
    }
    resetGroups() {
        this.register({
            $groups: {}
        }), this.resetGroupPropertiesForFlags(), this.reloadFeatureFlags()
    }
    setPersonPropertiesForFlags(e) {
        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        this.featureFlags.setPersonPropertiesForFlags(e, t)
    }
    resetPersonPropertiesForFlags() {
        this.featureFlags.resetPersonPropertiesForFlags()
    }
    setGroupPropertiesForFlags(e) {
        var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        this._requirePersonProcessing("posthog.setGroupPropertiesForFlags") && this.featureFlags.setGroupPropertiesForFlags(e, t)
    }
    resetGroupPropertiesForFlags(e) {
        this.featureFlags.resetGroupPropertiesForFlags(e)
    }
    reset(e) {
        var t, n, r, i, o;
        if (Rr.info("reset"), !this.__loaded) return Rr.uninitializedWarning("posthog.reset");
        var s = this.get_property("$device_id");
        if (this.consent.reset(), null === (t = this.persistence) || void 0 === t || t.clear(), null === (n = this.sessionPersistence) || void 0 === n || n.clear(), null === (r = this.surveys) || void 0 === r || r.reset(), null === (i = this.persistence) || void 0 === i || i.set_property(Ii, "anonymous"), null === (o = this.sessionManager) || void 0 === o || o.resetSessionId(), this._cachedIdentify = null, this.config.__preview_experimental_cookieless_mode) this.register_once({
            distinct_id: Ni,
            $device_id: null
        }, "");
        else {
            var a = this.config.get_device_id(jc());
            this.register_once({
                distinct_id: a,
                $device_id: e ? a : s
            }, "")
        }
    }
    get_distinct_id() {
        return this.get_property("distinct_id")
    }
    getGroups() {
        return this.get_property("$groups") || {}
    }
    get_session_id() {
        var e, t;
        return null !== (e = null === (t = this.sessionManager) || void 0 === t ? void 0 : t.checkAndGetSessionAndWindowId(!0).sessionId) && void 0 !== e ? e : ""
    }
    get_session_replay_url(e) {
        if (!this.sessionManager) return "";
        var {
            sessionId: t,
            sessionStartTimestamp: n
        } = this.sessionManager.checkAndGetSessionAndWindowId(!0), r = this.requestRouter.endpointFor("ui", "/project/".concat(this.config.token, "/replay/").concat(t));
        if (null != e && e.withTimestamp && n) {
            var i, o = null !== (i = e.timestampLookBack) && void 0 !== i ? i : 10;
            if (!n) return r;
            var s = Math.max(Math.floor(((new Date).getTime() - n) / 1e3) - o, 0);
            r += "?t=".concat(s)
        }
        return r
    }
    alias(e, t) {
        return e === this.get_property(Jr) ? (Rr.critical("Attempting to create alias for existing People user - aborting."), -2) : this._requirePersonProcessing("posthog.alias") ? (_r(t) && (t = this.get_distinct_id()), e !== t ? (this._register_single(Kr, e), this.capture("$create_alias", {
            alias: e,
            distinct_id: t
        })) : (Rr.warn("alias matches current distinct_id - skipping api call."), this.identify(e), -1)) : void 0
    }
    set_config(e) {
        var n, r, i, o, s = t({}, this.config);
        fr(e) && (Pr(this.config, kp(e)), null === (n = this.persistence) || void 0 === n || n.update_config(this.config, s), this.sessionPersistence = "sessionStorage" === this.config.persistence || "memory" === this.config.persistence ? this.persistence : new cd(t(t({}, this.config), {}, {
            persistence: "sessionStorage"
        })), tu.is_supported() && "true" === tu.get("ph_debug") && (this.config.debug = !0), this.config.debug && (Tr.DEBUG = !0, Rr.info("set_config", {
            config: e,
            oldConfig: s,
            newConfig: t({}, this.config)
        })), null === (r = this.sessionRecording) || void 0 === r || r.startIfEnabledOrStop(), null === (i = this.autocapture) || void 0 === i || i.startIfEnabled(), null === (o = this.heatmaps) || void 0 === o || o.startIfEnabled(), this.surveys.loadIfEnabled(), this._sync_opt_out_with_persistence())
    }
    startSessionRecording(e) {
        var t = !0 === e,
            n = {
                sampling: t || !(null == e || !e.sampling),
                linked_flag: t || !(null == e || !e.linked_flag),
                url_trigger: t || !(null == e || !e.url_trigger),
                event_trigger: t || !(null == e || !e.event_trigger)
            };
        if (Object.values(n).some(Boolean)) {
            var r, i, o, s, a;
            if (null === (r = this.sessionManager) || void 0 === r || r.checkAndGetSessionAndWindowId(), n.sampling) null === (i = this.sessionRecording) || void 0 === i || i.overrideSampling();
            if (n.linked_flag) null === (o = this.sessionRecording) || void 0 === o || o.overrideLinkedFlag();
            if (n.url_trigger) null === (s = this.sessionRecording) || void 0 === s || s.overrideTrigger("url");
            if (n.event_trigger) null === (a = this.sessionRecording) || void 0 === a || a.overrideTrigger("event")
        }
        this.set_config({
            disable_session_recording: !1
        })
    }
    stopSessionRecording() {
        this.set_config({
            disable_session_recording: !0
        })
    }
    sessionRecordingStarted() {
        var e;
        return !(null === (e = this.sessionRecording) || void 0 === e || !e.started)
    }
    captureException(e, n) {
        var r, i = new Error("PostHog syntheticException"),
            o = pr(null === (r = tr.__PosthogExtensions__) || void 0 === r ? void 0 : r.parseErrorAsProperties) ? tr.__PosthogExtensions__.parseErrorAsProperties([e.message, void 0, void 0, void 0, e], {
                syntheticException: i
            }) : t({
                $exception_level: "error",
                $exception_list: [{
                    type: e.name,
                    value: e.message,
                    mechanism: {
                        handled: !0,
                        synthetic: !1
                    }
                }]
            }, n);
        this.exceptions.sendExceptionEvent(o)
    }
    loadToolbar(e) {
        return this.toolbar.loadToolbar(e)
    }
    get_property(e) {
        var t;
        return null === (t = this.persistence) || void 0 === t ? void 0 : t.props[e]
    }
    getSessionProperty(e) {
        var t;
        return null === (t = this.sessionPersistence) || void 0 === t ? void 0 : t.props[e]
    }
    toString() {
        var e, t = null !== (e = this.config.name) && void 0 !== e ? e : Sp;
        return t !== Sp && (t = Sp + "." + t), t
    }
    _isIdentified() {
        var e, t;
        return "identified" === (null === (e = this.persistence) || void 0 === e ? void 0 : e.get_property(Ii)) || "identified" === (null === (t = this.sessionPersistence) || void 0 === t ? void 0 : t.get_property(Ii))
    }
    _hasPersonProcessing() {
        var e, t, n, r;
        return !("never" === this.config.person_profiles || "identified_only" === this.config.person_profiles && !this._isIdentified() && mr(this.getGroups()) && (null === (e = this.persistence) || void 0 === e || null === (t = e.props) || void 0 === t || !t[Kr]) && (null === (n = this.persistence) || void 0 === n || null === (r = n.props) || void 0 === r || !r[Ri]))
    }
    _shouldCapturePageleave() {
        return !0 === this.config.capture_pageleave || "if_capture_pageview" === this.config.capture_pageleave && this.config.capture_pageview
    }
    createPersonProfile() {
        this._hasPersonProcessing() || this._requirePersonProcessing("posthog.createPersonProfile") && this.setPersonProperties({}, {})
    }
    _requirePersonProcessing(e) {
        return "never" === this.config.person_profiles ? (Rr.error(e + ' was called, but process_person is set to "never". This call will be ignored.'), !1) : (this._register_single(Ri, !0), !0)
    }
    _sync_opt_out_with_persistence() {
        var e, t, n, r, i = this.consent.isOptedOut(),
            o = this.config.opt_out_persistence_by_default,
            s = this.config.disable_persistence || i && !!o;
        (null === (e = this.persistence) || void 0 === e ? void 0 : e.disabled) !== s && (null === (n = this.persistence) || void 0 === n || n.set_disabled(s));
        (null === (t = this.sessionPersistence) || void 0 === t ? void 0 : t.disabled) !== s && (null === (r = this.sessionPersistence) || void 0 === r || r.set_disabled(s))
    }
    opt_in_capturing(e) {
        var t;
        (this.consent.optInOut(!0), this._sync_opt_out_with_persistence(), _r(null == e ? void 0 : e.captureEventName) || null != e && e.captureEventName) && this.capture(null !== (t = null == e ? void 0 : e.captureEventName) && void 0 !== t ? t : "$opt_in", null == e ? void 0 : e.captureProperties, {
            send_instantly: !0
        });
        this.config.capture_pageview && this._captureInitialPageview()
    }
    opt_out_capturing() {
        this.consent.optInOut(!1), this._sync_opt_out_with_persistence()
    }
    has_opted_in_capturing() {
        return this.consent.isOptedIn()
    }
    has_opted_out_capturing() {
        return this.consent.isOptedOut()
    }
    clear_opt_in_out_capturing() {
        this.consent.reset(), this._sync_opt_out_with_persistence()
    }
    _is_bot() {
        return zn ? Yh(zn, this.config.custom_blocked_useragents) : void 0
    }
    _captureInitialPageview() {
        Yn && !this._initialPageviewCaptured && (this._initialPageviewCaptured = !0, this.capture("$pageview", {
            title: Yn.title
        }, {
            send_instantly: !0
        }))
    }
    debug(e) {
        !1 === e ? (null == Vn || Vn.console.log("You've disabled debug mode."), localStorage && localStorage.removeItem("ph_debug"), this.set_config({
            debug: !1
        })) : (null == Vn || Vn.console.log("You're now in debug mode. All calls to PostHog will be logged in your console.\nYou can disable this with `posthog.debug(false)`."), localStorage && localStorage.setItem("ph_debug", "true"), this.set_config({
            debug: !0
        }))
    }
    _runBeforeSend(e) {
        if (Sr(this.config.before_send)) return e;
        var t = hr(this.config.before_send) ? this.config.before_send : [this.config.before_send],
            n = e;
        for (var r of t) {
            if (n = r(n), Sr(n)) {
                var i = "Event '".concat(e.event, "' was rejected in beforeSend function");
                return xr(e.event) ? Rr.warn("".concat(i, ". This can cause unexpected behavior.")) : Rr.info(i), null
            }
            n.properties && !mr(n.properties) || Rr.warn("Event '".concat(e.event, "' has no properties after beforeSend function, this is likely an error."))
        }
        return n
    }
    getPageViewId() {
        var e;
        return null === (e = this.pageViewManager._currentPageview) || void 0 === e ? void 0 : e.pageViewId
    }
}! function(e, t) {
    for (var n = 0; n < t.length; n++) e.prototype[t[n]] = qr(e.prototype[t[n]])
}(xp, ["identify"]);
var Tp, Mp = (Tp = bp[Sp] = new xp, function() {
    function e() {
        e.done || (e.done = !0, Cp = !1, Or(bp, (function(e) {
            e._dom_loaded()
        })))
    }
    null != Yn && Yn.addEventListener && ("complete" === Yn.readyState ? e() : Yn.addEventListener("DOMContentLoaded", e, !1)), Vn && Wr(Vn, "load", e, !0)
}(), Tp);
export {
    nr as COPY_AUTOCAPTURE_EVENT, $n as Compression, xp as PostHog, Ho as SurveyQuestionBranchingType, qo as SurveyQuestionType, Bo as SurveyType, Mp as
    default, rr as knownUnsafeEditableEvent, Mp as posthog, ir as severityLevels
};
//# sourceMappingURL=module.full.no-external.js.map