
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.43.0' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/Page.svelte generated by Svelte v3.43.0 */
    const file$1 = "src/Page.svelte";

    function create_fragment$1(ctx) {
    	let div3;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let div2;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			t0 = space();
    			div1 = element("div");
    			if (default_slot) default_slot.c();
    			t1 = space();
    			div2 = element("div");
    			attr_dev(div0, "class", "side svelte-12itkco");
    			add_location(div0, file$1, 24, 2, 563);
    			attr_dev(div1, "class", "container svelte-12itkco");
    			add_location(div1, file$1, 25, 2, 586);
    			attr_dev(div2, "class", "side svelte-12itkco");
    			add_location(div2, file$1, 28, 2, 634);
    			attr_dev(div3, "class", "row svelte-12itkco");
    			add_location(div3, file$1, 23, 0, 543);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div3, t0);
    			append_dev(div3, div1);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			append_dev(div3, t1);
    			append_dev(div3, div2);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Page', slots, ['default']);
    	let cmp;

    	onMount(() => {
    	}); // const cb = function (entries) {
    	//   if (entries[0].intersectionRatio > 0.2) {
    	//     if (history.pushState) {
    	//       history.pushState(null, null, '#' + name)

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Page> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ onMount, cmp });

    	$$self.$inject_state = $$props => {
    		if ('cmp' in $$props) cmp = $$props.cmp;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [$$scope, slots];
    }

    class Page extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Page",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.43.0 */
    const file = "src/App.svelte";

    // (5:0) <Page>
    function create_default_slot_3(ctx) {
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let div2;
    	let t5;
    	let div3;
    	let t7;
    	let div4;
    	let t8;
    	let div5;
    	let t10;
    	let div10;
    	let t11;
    	let ul;
    	let div6;
    	let t13;
    	let div7;
    	let t15;
    	let div8;
    	let t17;
    	let div9;
    	let t18;
    	let br0;
    	let t19;
    	let br1;
    	let t20;
    	let br2;
    	let t21;
    	let t22;
    	let kb0;
    	let t24;
    	let kb1;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			div0.textContent = "okay but consider-";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "all of our information is in text";
    			t3 = space();
    			div2 = element("div");
    			div2.textContent = "and we can't get it out,";
    			t5 = space();
    			div3 = element("div");
    			div3.textContent = "and we don't really have a plan to.";
    			t7 = space();
    			div4 = element("div");
    			t8 = space();
    			div5 = element("div");
    			div5.textContent = "so this organization";
    			t10 = space();
    			div10 = element("div");
    			t11 = text("is trying to build some ways\n    ");
    			ul = element("ul");
    			div6 = element("div");
    			div6.textContent = "ways to bounce easy queries off of it";
    			t13 = space();
    			div7 = element("div");
    			div7.textContent = "to flip it around, and mess with it.";
    			t15 = space();
    			div8 = element("div");
    			div8.textContent = "to make text interfaces interesting.";
    			t17 = space();
    			div9 = element("div");
    			t18 = text("we think open-source, web-focused tools\n      ");
    			br0 = element("br");
    			t19 = text("\n      and a stupidly-good group of contributers\n      ");
    			br1 = element("br");
    			t20 = text("\n      are the best way to build\n      ");
    			br2 = element("br");
    			t21 = text("\n      such a complicated group of things.");
    			t22 = space();
    			kb0 = element("kb");
    			kb0.textContent = "<script src=\"https://unpkg.com/compromise\"></script>";
    			t24 = space();
    			kb1 = element("kb");
    			kb1.textContent = "npm install compromise";
    			add_location(div0, file, 5, 2, 64);
    			attr_dev(div1, "class", "more");
    			add_location(div1, file, 6, 2, 96);
    			add_location(div2, file, 7, 2, 156);
    			add_location(div3, file, 8, 2, 194);
    			attr_dev(div4, "class", "space");
    			add_location(div4, file, 9, 2, 243);
    			add_location(div5, file, 10, 2, 267);
    			add_location(div6, file, 14, 6, 368);
    			add_location(div7, file, 15, 6, 423);
    			add_location(div8, file, 16, 6, 477);
    			add_location(ul, file, 13, 4, 357);
    			add_location(br0, file, 20, 6, 597);
    			add_location(br1, file, 22, 6, 658);
    			add_location(br2, file, 24, 6, 703);
    			add_location(div9, file, 18, 4, 539);
    			attr_dev(div10, "class", "more");
    			add_location(div10, file, 11, 2, 301);
    			add_location(kb0, file, 28, 2, 774);
    			add_location(kb1, file, 29, 2, 850);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div3, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div4, anchor);
    			insert_dev(target, t8, anchor);
    			insert_dev(target, div5, anchor);
    			insert_dev(target, t10, anchor);
    			insert_dev(target, div10, anchor);
    			append_dev(div10, t11);
    			append_dev(div10, ul);
    			append_dev(ul, div6);
    			append_dev(ul, t13);
    			append_dev(ul, div7);
    			append_dev(ul, t15);
    			append_dev(ul, div8);
    			append_dev(div10, t17);
    			append_dev(div10, div9);
    			append_dev(div9, t18);
    			append_dev(div9, br0);
    			append_dev(div9, t19);
    			append_dev(div9, br1);
    			append_dev(div9, t20);
    			append_dev(div9, br2);
    			append_dev(div9, t21);
    			insert_dev(target, t22, anchor);
    			insert_dev(target, kb0, anchor);
    			insert_dev(target, t24, anchor);
    			insert_dev(target, kb1, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(div5);
    			if (detaching) detach_dev(t10);
    			if (detaching) detach_dev(div10);
    			if (detaching) detach_dev(t22);
    			if (detaching) detach_dev(kb0);
    			if (detaching) detach_dev(t24);
    			if (detaching) detach_dev(kb1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(5:0) <Page>",
    		ctx
    	});

    	return block;
    }

    // (33:0) <Page>
    function create_default_slot_2(ctx) {
    	let h2;
    	let t1;
    	let div0;
    	let t3;
    	let div1;
    	let t5;
    	let div2;
    	let t7;
    	let div3;
    	let t9;
    	let div4;
    	let t11;
    	let div5;
    	let t13;
    	let div9;
    	let div6;
    	let t15;
    	let div7;
    	let t16;
    	let div8;
    	let t18;
    	let div10;
    	let t20;
    	let div11;
    	let t22;
    	let ul;
    	let li0;
    	let t24;
    	let li1;
    	let t26;
    	let li2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "step 1: tokenization";
    			t1 = space();
    			div0 = element("div");
    			div0.textContent = "compromise/one";
    			t3 = space();
    			div1 = element("div");
    			div1.textContent = "a really, very, uncontroversial way to split sentences and words into bits.";
    			t5 = space();
    			div2 = element("div");
    			div2.textContent = "this basic thing is helping government orgs, banks, and many software companies.";
    			t7 = space();
    			div3 = element("div");
    			div3.textContent = "this super-basic thing has been refined for 8 ruthless github-years";
    			t9 = space();
    			div4 = element("div");
    			div4.textContent = "really - it actually works.";
    			t11 = space();
    			div5 = element("div");
    			div5.textContent = "when someone tells you it's impossible, quietly disagree.";
    			t13 = space();
    			div9 = element("div");
    			div6 = element("div");
    			div6.textContent = "it's like 20kb of javascript";
    			t15 = space();
    			div7 = element("div");
    			t16 = space();
    			div8 = element("div");
    			div8.textContent = "+ symmetric tools";
    			t18 = space();
    			div10 = element("div");
    			div10.textContent = "sometimes tokenization is enough";
    			t20 = space();
    			div11 = element("div");
    			div11.textContent = "you can do this kinda stuff:";
    			t22 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "syllable parsing";
    			t24 = space();
    			li1 = element("li");
    			li1.textContent = "text-typeahead";
    			t26 = space();
    			li2 = element("li");
    			li2.textContent = "indexing and lookup";
    			add_location(h2, file, 33, 2, 900);
    			add_location(div0, file, 34, 2, 932);
    			add_location(div1, file, 35, 2, 960);
    			add_location(div2, file, 36, 2, 1049);
    			add_location(div3, file, 37, 2, 1143);
    			add_location(div4, file, 38, 2, 1224);
    			add_location(div5, file, 39, 2, 1265);
    			add_location(div6, file, 41, 4, 1358);
    			add_location(div7, file, 42, 4, 1402);
    			add_location(div8, file, 43, 4, 1414);
    			attr_dev(div9, "class", "row");
    			add_location(div9, file, 40, 2, 1336);
    			add_location(div10, file, 46, 2, 1474);
    			add_location(div11, file, 47, 2, 1520);
    			add_location(li0, file, 49, 4, 1571);
    			add_location(li1, file, 50, 4, 1601);
    			add_location(li2, file, 51, 4, 1629);
    			add_location(ul, file, 48, 2, 1562);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div3, anchor);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, div4, anchor);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, div5, anchor);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div6);
    			append_dev(div9, t15);
    			append_dev(div9, div7);
    			append_dev(div9, t16);
    			append_dev(div9, div8);
    			insert_dev(target, t18, anchor);
    			insert_dev(target, div10, anchor);
    			insert_dev(target, t20, anchor);
    			insert_dev(target, div11, anchor);
    			insert_dev(target, t22, anchor);
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(ul, t24);
    			append_dev(ul, li1);
    			append_dev(ul, t26);
    			append_dev(ul, li2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(div5);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(div9);
    			if (detaching) detach_dev(t18);
    			if (detaching) detach_dev(div10);
    			if (detaching) detach_dev(t20);
    			if (detaching) detach_dev(div11);
    			if (detaching) detach_dev(t22);
    			if (detaching) detach_dev(ul);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(33:0) <Page>",
    		ctx
    	});

    	return block;
    }

    // (56:0) <Page>
    function create_default_slot_1(ctx) {
    	let h2;
    	let t1;
    	let div0;
    	let t3;
    	let div1;
    	let t5;
    	let div2;
    	let t7;
    	let div3;
    	let t8;
    	let i;
    	let t10;
    	let t11;
    	let div4;
    	let t13;
    	let div5;
    	let t15;
    	let div9;
    	let div6;
    	let t17;
    	let div7;
    	let t19;
    	let div8;
    	let t21;
    	let div16;
    	let div10;
    	let t23;
    	let div11;
    	let t25;
    	let div12;
    	let t27;
    	let div13;
    	let t29;
    	let div14;
    	let t31;
    	let div15;
    	let t32;
    	let br0;
    	let t33;
    	let br1;
    	let t34;
    	let t35;
    	let ul;
    	let li0;
    	let t37;
    	let li1;
    	let t39;
    	let li2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "step 2: word interpretation";
    			t1 = space();
    			div0 = element("div");
    			div0.textContent = "compromise/two";
    			t3 = space();
    			div1 = element("div");
    			div1.textContent = "there are some complicated things here,";
    			t5 = space();
    			div2 = element("div");
    			div2.textContent = "- but it's not actually that bad -";
    			t7 = space();
    			div3 = element("div");
    			t8 = text("you can say 'waterpolo' and 'buffalo' are ");
    			i = element("i");
    			i.textContent = "Nouns";
    			t10 = text(",");
    			t11 = space();
    			div4 = element("div");
    			div4.textContent = "without knowing what they are";
    			t13 = space();
    			div5 = element("div");
    			div5.textContent = "and sometimes this is enough.";
    			t15 = space();
    			div9 = element("div");
    			div6 = element("div");
    			div6.textContent = "it was the . of times";
    			t17 = space();
    			div7 = element("div");
    			div7.textContent = "simon says #Verb+";
    			t19 = space();
    			div8 = element("div");
    			div8.textContent = "#FirstName is on #Ordinal";
    			t21 = space();
    			div16 = element("div");
    			div10 = element("div");
    			div10.textContent = "creating a series of templates,";
    			t23 = space();
    			div11 = element("div");
    			div11.textContent = "to scoop-up information in text";
    			t25 = space();
    			div12 = element("div");
    			div12.textContent = "like it's in some little database";
    			t27 = space();
    			div13 = element("div");
    			div13.textContent = "and your queries can be ad-hoc.";
    			t29 = space();
    			div14 = element("div");
    			div14.textContent = "it surprising how helpful this is.";
    			t31 = space();
    			div15 = element("div");
    			t32 = text("and how much leg-work schemes like this can do,\n      ");
    			br0 = element("br");
    			t33 = text("\n      before handing it off to some kind of AI thing.\n      ");
    			br1 = element("br");
    			t34 = text("\n      or sleepy eyeballs.");
    			t35 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "bot-interfaces";
    			t37 = space();
    			li1 = element("li");
    			li1.textContent = "redaction";
    			t39 = space();
    			li2 = element("li");
    			li2.textContent = "contractions";
    			add_location(h2, file, 56, 2, 1684);
    			add_location(div0, file, 57, 2, 1723);
    			add_location(div1, file, 58, 2, 1751);
    			add_location(div2, file, 59, 2, 1804);
    			add_location(i, file, 60, 49, 1899);
    			add_location(div3, file, 60, 2, 1852);
    			add_location(div4, file, 61, 2, 1921);
    			add_location(div5, file, 62, 2, 1964);
    			add_location(div6, file, 64, 4, 2017);
    			add_location(div7, file, 65, 4, 2054);
    			add_location(div8, file, 66, 4, 2087);
    			add_location(div9, file, 63, 2, 2007);
    			add_location(div10, file, 69, 4, 2145);
    			add_location(div11, file, 70, 4, 2192);
    			add_location(div12, file, 71, 4, 2239);
    			add_location(div13, file, 72, 4, 2288);
    			add_location(div14, file, 73, 4, 2335);
    			add_location(br0, file, 76, 6, 2451);
    			add_location(br1, file, 78, 6, 2518);
    			add_location(div15, file, 74, 4, 2385);
    			add_location(li0, file, 82, 6, 2577);
    			add_location(li1, file, 83, 6, 2607);
    			add_location(li2, file, 84, 6, 2632);
    			add_location(ul, file, 81, 4, 2566);
    			add_location(div16, file, 68, 2, 2135);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, t8);
    			append_dev(div3, i);
    			append_dev(div3, t10);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, div4, anchor);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, div5, anchor);
    			insert_dev(target, t15, anchor);
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div6);
    			append_dev(div9, t17);
    			append_dev(div9, div7);
    			append_dev(div9, t19);
    			append_dev(div9, div8);
    			insert_dev(target, t21, anchor);
    			insert_dev(target, div16, anchor);
    			append_dev(div16, div10);
    			append_dev(div16, t23);
    			append_dev(div16, div11);
    			append_dev(div16, t25);
    			append_dev(div16, div12);
    			append_dev(div16, t27);
    			append_dev(div16, div13);
    			append_dev(div16, t29);
    			append_dev(div16, div14);
    			append_dev(div16, t31);
    			append_dev(div16, div15);
    			append_dev(div15, t32);
    			append_dev(div15, br0);
    			append_dev(div15, t33);
    			append_dev(div15, br1);
    			append_dev(div15, t34);
    			append_dev(div16, t35);
    			append_dev(div16, ul);
    			append_dev(ul, li0);
    			append_dev(ul, t37);
    			append_dev(ul, li1);
    			append_dev(ul, t39);
    			append_dev(ul, li2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div3);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(div5);
    			if (detaching) detach_dev(t15);
    			if (detaching) detach_dev(div9);
    			if (detaching) detach_dev(t21);
    			if (detaching) detach_dev(div16);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(56:0) <Page>",
    		ctx
    	});

    	return block;
    }

    // (90:0) <Page>
    function create_default_slot(ctx) {
    	let h2;
    	let t1;
    	let div0;
    	let t3;
    	let div5;
    	let div1;
    	let t5;
    	let div2;
    	let t7;
    	let div3;
    	let t9;
    	let div4;
    	let t11;
    	let div6;
    	let t12;
    	let i;
    	let t14;
    	let t15;
    	let div7;
    	let t17;
    	let div8;
    	let t19;
    	let div9;
    	let t21;
    	let div10;
    	let t23;
    	let div11;
    	let t25;
    	let div13;
    	let div12;
    	let t27;
    	let div15;
    	let div14;
    	let t29;
    	let div17;
    	let div16;
    	let t31;
    	let ul;
    	let li0;
    	let t33;
    	let li1;
    	let t35;
    	let li2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "step 3: phrase labelling";
    			t1 = space();
    			div0 = element("div");
    			div0.textContent = "compromise/three";
    			t3 = space();
    			div5 = element("div");
    			div1 = element("div");
    			div1.textContent = "'captain of the football team' is one thing";
    			t5 = space();
    			div2 = element("div");
    			div2.textContent = "so is 'jet skiing'";
    			t7 = space();
    			div3 = element("div");
    			div3.textContent = "'breaking up'";
    			t9 = space();
    			div4 = element("div");
    			div4.textContent = "and 'Calgary, Alberta'";
    			t11 = space();
    			div6 = element("div");
    			t12 = text("words are not the most-helpful ");
    			i = element("i");
    			i.textContent = "units";
    			t14 = text(" for working with text.");
    			t15 = space();
    			div7 = element("div");
    			div7.textContent = "it's too bad.";
    			t17 = space();
    			div8 = element("div");
    			div8.textContent = "words are tricky things-";
    			t19 = space();
    			div9 = element("div");
    			div9.textContent = "usually people want a phrase, a clause, or a slice of words.";
    			t21 = space();
    			div10 = element("div");
    			div10.textContent = "that do one thing.";
    			t23 = space();
    			div11 = element("div");
    			div11.textContent = "this is a harder, more-goofy task, but actually not so bad.";
    			t25 = space();
    			div13 = element("div");
    			div12 = element("div");
    			div12.textContent = "now you can turn 'four hundred and five' into '405'";
    			t27 = space();
    			div15 = element("div");
    			div14 = element("div");
    			div14.textContent = "pull-out the details -";
    			t29 = space();
    			div17 = element("div");
    			div16 = element("div");
    			div16.textContent = "or throw a sentence around";
    			t31 = space();
    			ul = element("ul");
    			li0 = element("li");
    			li0.textContent = "number parsing";
    			t33 = space();
    			li1 = element("li");
    			li1.textContent = "verb-conjugation";
    			t35 = space();
    			li2 = element("li");
    			li2.textContent = "date parsing";
    			add_location(h2, file, 90, 2, 2691);
    			add_location(div0, file, 91, 2, 2727);
    			add_location(div1, file, 93, 4, 2767);
    			add_location(div2, file, 94, 4, 2826);
    			add_location(div3, file, 95, 4, 2860);
    			add_location(div4, file, 96, 4, 2889);
    			add_location(div5, file, 92, 2, 2757);
    			add_location(i, file, 98, 38, 2970);
    			add_location(div6, file, 98, 2, 2934);
    			add_location(div7, file, 99, 2, 3014);
    			add_location(div8, file, 100, 2, 3041);
    			add_location(div9, file, 101, 2, 3079);
    			add_location(div10, file, 102, 2, 3153);
    			add_location(div11, file, 103, 2, 3185);
    			add_location(div12, file, 105, 4, 3268);
    			add_location(div13, file, 104, 2, 3258);
    			add_location(div14, file, 109, 4, 3374);
    			add_location(div15, file, 108, 2, 3364);
    			add_location(div16, file, 113, 4, 3451);
    			add_location(div17, file, 112, 2, 3441);
    			add_location(li0, file, 117, 4, 3531);
    			add_location(li1, file, 118, 4, 3559);
    			add_location(li2, file, 119, 4, 3589);
    			add_location(ul, file, 116, 2, 3522);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div0, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div1);
    			append_dev(div5, t5);
    			append_dev(div5, div2);
    			append_dev(div5, t7);
    			append_dev(div5, div3);
    			append_dev(div5, t9);
    			append_dev(div5, div4);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, div6, anchor);
    			append_dev(div6, t12);
    			append_dev(div6, i);
    			append_dev(div6, t14);
    			insert_dev(target, t15, anchor);
    			insert_dev(target, div7, anchor);
    			insert_dev(target, t17, anchor);
    			insert_dev(target, div8, anchor);
    			insert_dev(target, t19, anchor);
    			insert_dev(target, div9, anchor);
    			insert_dev(target, t21, anchor);
    			insert_dev(target, div10, anchor);
    			insert_dev(target, t23, anchor);
    			insert_dev(target, div11, anchor);
    			insert_dev(target, t25, anchor);
    			insert_dev(target, div13, anchor);
    			append_dev(div13, div12);
    			insert_dev(target, t27, anchor);
    			insert_dev(target, div15, anchor);
    			append_dev(div15, div14);
    			insert_dev(target, t29, anchor);
    			insert_dev(target, div17, anchor);
    			append_dev(div17, div16);
    			insert_dev(target, t31, anchor);
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			append_dev(ul, t33);
    			append_dev(ul, li1);
    			append_dev(ul, t35);
    			append_dev(ul, li2);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div5);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(div6);
    			if (detaching) detach_dev(t15);
    			if (detaching) detach_dev(div7);
    			if (detaching) detach_dev(t17);
    			if (detaching) detach_dev(div8);
    			if (detaching) detach_dev(t19);
    			if (detaching) detach_dev(div9);
    			if (detaching) detach_dev(t21);
    			if (detaching) detach_dev(div10);
    			if (detaching) detach_dev(t23);
    			if (detaching) detach_dev(div11);
    			if (detaching) detach_dev(t25);
    			if (detaching) detach_dev(div13);
    			if (detaching) detach_dev(t27);
    			if (detaching) detach_dev(div15);
    			if (detaching) detach_dev(t29);
    			if (detaching) detach_dev(div17);
    			if (detaching) detach_dev(t31);
    			if (detaching) detach_dev(ul);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(90:0) <Page>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let page0;
    	let t0;
    	let page1;
    	let t1;
    	let page2;
    	let t2;
    	let page3;
    	let current;

    	page0 = new Page({
    			props: {
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	page1 = new Page({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	page2 = new Page({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	page3 = new Page({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(page0.$$.fragment);
    			t0 = space();
    			create_component(page1.$$.fragment);
    			t1 = space();
    			create_component(page2.$$.fragment);
    			t2 = space();
    			create_component(page3.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(page0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(page1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(page2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(page3, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const page0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				page0_changes.$$scope = { dirty, ctx };
    			}

    			page0.$set(page0_changes);
    			const page1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				page1_changes.$$scope = { dirty, ctx };
    			}

    			page1.$set(page1_changes);
    			const page2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				page2_changes.$$scope = { dirty, ctx };
    			}

    			page2.$set(page2_changes);
    			const page3_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				page3_changes.$$scope = { dirty, ctx };
    			}

    			page3.$set(page3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(page0.$$.fragment, local);
    			transition_in(page1.$$.fragment, local);
    			transition_in(page2.$$.fragment, local);
    			transition_in(page3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(page0.$$.fragment, local);
    			transition_out(page1.$$.fragment, local);
    			transition_out(page2.$$.fragment, local);
    			transition_out(page3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(page0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(page1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(page2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(page3, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Page });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
