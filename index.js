const nodes = {
	add: {
		title: "Add",
		category: "number",
		inputs: [
			{ name: "Number", type: "number" },
			{ name: "Number", type: "number" }
		],
		outputs: [{ name: "Sum", type: "number" }],
		run([a, b]) {
			return [a + b];
		}
	},
	sub: {
		title: "Subtract",
		category: "number",
		inputs: [
			{ name: "Number", type: "number" },
			{ name: "Number", type: "number" }
		],
		outputs: [{ name: "Difference", type: "number" }],
		run([a, b]) {
			return [a - b];
		}
	},
	mul: {
		title: "Multiply",
		category: "number",
		inputs: [
			{ name: "Number", type: "number" },
			{ name: "Number", type: "number" }
		],
		outputs: [{ name: "Product", type: "number" }],
		run([a, b]) {
			return [a * b];
		}
	},
	div: {
		title: "Divide",
		category: "number",
		inputs: [
			{ name: "Number", type: "number" },
			{ name: "Number", type: "number" }
		],
		outputs: [
			{ name: "Quotient", type: "number" },
			{ name: "Remainder", type: "number" }
		],
		run([a, b]) {
			return [Math.floor(a / b), a % b];
		}
	},
	join: {
		title: "Join",
		category: "string",
		inputs: [
			{ name: "A", type: "any" },
			{ name: "B", type: "any" }
		],
		outputs: [{ name: "Merge", type: "string" }],
		run([a, b]) {
			return ["" + a + b];
		}
	},
	length: {
		title: "Length",
		category: "string",
		inputs: [{ name: "String", type: "string" }],
		outputs: [{ name: "Length", type: "number" }],
		run([string]) {
			return [string.length];
		}
	},
	print: {
		title: "Print",
		category: "output",
		inputs: [{ name: "Text", type: "any" }],
		outputs: [{ type: "flow" }],
		flow: true,
		run([text]) {
			console.log(text);
		}
	},
	alert: {
		title: "Alert",
		category: "output",
		inputs: [{ name: "Text", type: "string" }],
		outputs: [{ type: "flow" }],
		flow: true,
		run([text]) {
			alert(text);
		}
	},
	equals: {
		title: "Equals",
		category: "boolean",
		inputs: [
			{ name: "A", type: "any" },
			{ name: "B", type: "any" }
		],
		outputs: [{ name: "Equal", type: "boolean" }],
		run([a, b]) {
			return [a === b];
		}
	},
	lessThan: {
		title: "Less Than",
		category: "boolean",
		inputs: [
			{ name: "A", type: "number" },
			{ name: "B", type: "number" }
		],
		outputs: [{ name: "Lesser", type: "boolean" }],
		run([a, b]) {
			return [a < b];
		}
	},
	greaterThan: {
		title: "Greater Than",
		category: "boolean",
		inputs: [
			{ name: "A", type: "number" },
			{ name: "B", type: "number" }
		],
		outputs: [{ name: "Greater", type: "boolean" }],
		run([a, b]) {
			return [a > b];
		}
	},
	if: {
		title: "If",
		category: "flow",
		inputs: [{ name: "Condition", type: "boolean" }],
		outputs: [
			{ name: "Then", type: "flow" },
			{ name: "Else", type: "flow" }
		],
		flow: true,
		run([condition]) {
			return [condition, !condition];
		}
	},
	prompt: {
		title: "Get Input",
		category: "string",
		inputs: [{ name: "Prompt", type: "string" }],
		outputs: [{ name: "User Input", type: "string" }, { type: "flow" }],
		flow: true,
		run([prompt]) {
			return [window.prompt(prompt)];
		}
	},
	null: {
		showTitle: false,
		title: "Null",
		outputs: [{ name: "null", type: "null" }],
		run() {
			return null;
		}
	},
	boolean: {
		showTitle: false,
		title: "Boolean",
		category: "boolean",
		outputs: [
			{ name: "true", type: "boolean" },
			{ name: "false", type: "boolean" }
		],
		run() {
			return [true, false];
		}
	},
	not: {
		title: "NOT Gate",
		category: "boolean",
		inputs: [{ name: "Boolean", type: "boolean" }],
		outputs: [{ name: "NOT", type: "boolean" }],
		run([bool]) {
			return [!bool];
		}
	},
	and: {
		title: "AND Gate",
		category: "boolean",
		inputs: [
			{ name: "A", type: "boolean" },
			{ name: "B", type: "boolean" }
		],
		outputs: [{ name: "AND", type: "boolean" }],
		run([a, b]) {
			return [a && b];
		}
	},
	or: {
		title: "OR Gate",
		category: "boolean",
		inputs: [
			{ name: "A", type: "boolean" },
			{ name: "B", type: "boolean" }
		],
		outputs: [{ name: "OR", type: "boolean" }],
		run([a, b]) {
			return [a || b];
		}
	},
	xor: {
		title: "XOR Gate",
		category: "boolean",
		inputs: [
			{ name: "A", type: "boolean" },
			{ name: "B", type: "boolean" }
		],
		outputs: [{ name: "XOR", type: "boolean" }],
		run([a, b]) {
			return [(a || b) && !(a && b)];
		}
	},
	onstart: {
		title: "On Start",
		category: "flow",
		outputs: [{ type: "flow" }]
	}
};

const types = {
	number: {
		color: "#ffc300",
		processor(value) {
			return parseInt(value.toString());
		}
	},
	string: {
		color: "#43ba43",
		processor(value) {
			return value.toString();
		}
	},
	boolean: {
		color: "#FF5572",
		createNode: false,
		processor(value) {
			return Boolean(value);
		}
	},
	null: {
		color: "black",
		createNode: false,
		processor() {
			return null;
		}
	}
};

const nodeMachine = {
	nodes: null,
	types: null,

	NodeElement: class NodeElement extends HTMLElement {
		constructor(type) {
			super();

			this.type = this.dataset.type ?? type;
			const typeData = nodeMachine.nodes[this.dataset.type ?? type];

			this.attachShadow({ mode: "open" });

			this.container = document.createElement("div");
			this.container.classList.add("container");

			this.value = null;

			if (typeData.showTitle ?? true) {
				const title = document.createElement("span");
				title.innerText = typeData.title;
				title.classList.add("title");
				this.container.appendChild(title);
				if (typeData.flow) title.style.marginLeft = 5;
			}

			const ioContainer = document.createElement("div");

			if (typeData.flow) {
				const el = document.createElement("div");
				el.classList.add("flow", "in", "io");

				const pin = new nodeMachine.PinElement("flow", false);

				el.appendChild(pin);
				this.container.appendChild(el);
			}

			if (typeData.inputs)
				typeData.inputs.forEach((input) => {
					const el = document.createElement("div");
					el.classList.add("in", "io");

					const pin = new nodeMachine.PinElement(input.type, false);

					const tag = document.createElement("span");
					tag.innerText = input.name;
					tag.classList.add("tag");

					el.append(pin, tag);
					ioContainer.appendChild(el);
				});

			if (typeData.outputs)
				typeData.outputs.forEach((out) => {
					if (out.type === "flow") {
						const el = document.createElement("div");
						el.classList.add("flow", "out", "io");

						if (out.name) {
							const tag = document.createElement("span");
							tag.classList.add("tag");
							tag.innerText = out.name;
							el.appendChild(tag);
						}

						const pin = new nodeMachine.PinElement("flow", true);
						el.appendChild(pin);

						ioContainer.appendChild(el);
					} else {
						const el = document.createElement("div");
						el.classList.add("out", "io");

						const tag = document.createElement(out.input ? "input" : "span");
						tag.classList.add("tag");
						if (out.input) {
							tag.placeholder = out.name;
							tag.addEventListener("mousedown", (e) => e.stopPropagation());
						} else tag.innerText = out.name;

						const pin = new nodeMachine.PinElement(out.type, true);

						el.append(tag, pin);
						ioContainer.appendChild(el);
					}
				});

			if (typeData.flow < 2) {
			}

			const style = document.createElement("link");
			style.href = "css/node.css";
			style.rel = "stylesheet";

			this.container.appendChild(ioContainer);
			this.shadowRoot.append(style, this.container);

			this.grabbed = false;
			this.style.position = "absolute";
			this.container.addEventListener("mousedown", this.mouseDown);
			document.addEventListener("mousemove", this.mouseMove);
			this.container.addEventListener("mouseup", this.mouseUp);
			this.container.addEventListener("contextmenu", this.ctxMenu);
		}

		connectedCallback() {
			this.parentElement.renderList.push(this);
		}

		mouseDown = (e) => {
			if (e.button === 0) {
				this.container.classList.add("grab");
				this.grabbed = true;
			}
		};

		mouseMove = (e) => {
			if (this.grabbed) {
				this.style.left = e.clientX - 85;
				this.style.top = e.clientY - 35;
			}
		};

		mouseUp = () => {
			this.container.classList.remove("grab");
			this.grabbed = false;
		};

		ctxMenu = (e) => {
			e.stopPropagation();
			e.preventDefault();

			if (this.parentElement.menu) this.parentElement.menu.remove();
			const menu = new nodeMachine.CTXMenuElement([
				{
					title: "Remove Node",
					callback: () => {
						this.shadowRoot
							.querySelectorAll(".io.out:not(.flow) nm-pin")
							.forEach((pin) => {
								this.parentElement.renderList.forEach((w) => {
									if (w.p1 === pin && w.p2.type === "any")
										w.p2.el.style.backgroundColor = "lightgray";
								});
							});

						this.parentElement.renderList.splice(
							this.parentElement.renderList.indexOf(this),
							1
						);

						this.remove();
						document.removeEventListener("mousemove", this.mouseMove);
					}
				},
				{
					title: "Run",
					callback: () => this.parentElement.runNode(this)
				}
			]);
			menu.style = `position: absolute; left: ${e.clientX}; top: ${e.clientY}`;

			this.parentElement.appendChild(menu);
			this.parentElement.menu = menu;
		};

		render() {
			return {
				type: "node",
				node: this.type,
				value: this.shadowRoot.querySelector("input")?.value,
				position: { x: this.style.left, y: this.style.top }
			};
		}
	},

	PinElement: class PinElement extends HTMLElement {
		constructor(type, out) {
			super();

			this.out = out;
			this.type = type;
			this.typeData =
				type === "flow"
					? { color: "#3a59af" }
					: nodeMachine.types[this.dataset.type ?? type];

			this.attachShadow({ mode: "open" });

			this.el = document.createElement("div");
			if (type !== "flow") this.el.style.backgroundColor = this.typeData.color;
			else {
				this.el.style.backgroundColor = "#3a59af";
				this.el.style.transform = "rotate(45deg)";
				this.el.style.borderRadius = "6px";
			}

			const style = document.createElement("link");
			style.href = "css/pin.css";
			style.rel = "stylesheet";

			this.shadowRoot.append(style, this.el);
			this.el.addEventListener("mousedown", this.createWire);
		}

		connectedCallback() {
			this.node = this.parentElement.parentElement.classList.contains(
				"container"
			)
				? this.parentElement.parentElement.parentNode.host
				: this.parentElement.parentElement.parentElement.parentNode.host;
			this.canvas = this.node.parentElement;
		}

		disconnectedCallback() {
			this.canvas.renderList = this.canvas.renderList.filter(
				(w) => w.p1 !== this && w.p2 !== this
			);
		}

		createWire = (e) => {
			e.stopPropagation();
			if (e.button !== 0) return;

			if (!nodeMachine.activeWire && this.out) {
				new nodeMachine.Wire(this.node.parentElement, this);
			} else if (nodeMachine.activeWire?.p1 === this && this.out) {
				const rl = this.node.parentElement.renderList;
				rl.splice(rl.indexOf(nodeMachine.activeWire), 1);
				nodeMachine.activeWire = null;
			} else if (
				!this.out &&
				nodeMachine.activeWire &&
				(nodeMachine.activeWire.p1.type === "flow") === (this.type === "flow")
			) {
				if (this.type !== "flow")
					this.canvas.renderList.forEach((w, i) => {
						if (w.p2 === this) this.canvas.renderList.splice(i, 1);
					});

				nodeMachine.activeWire.p2 = this;

				if (this.type === "flow")
					this.canvas.renderList.forEach((w, i) => {
						if (w.p1 === nodeMachine.activeWire.p1 && w.p2 !== this)
							this.canvas.renderList.splice(i, 1);
					});

				nodeMachine.activeWire.active = false;
				if (this.type === "any")
					this.el.style.backgroundColor =
						nodeMachine.activeWire.p1.typeData.color;
				nodeMachine.activeWire.render();
				nodeMachine.activeWire = null;
			} else if (!this.out) {
				if (this.type === "any") this.el.style.backgroundColor = "lightgray";
				this.canvas.renderList.forEach((w) => {
					if (w.p2 === this) w.pop();
				});
			}
		};
	},

	Wire: class Wire {
		/**
		 * Creates an instance of WireElement.
		 * @param {HTMLElement} canvas
		 * @param {HTMLElement} p1
		 * @param {HTMLElement} [p2=null]
		 */
		constructor(canvas, p1, p2 = null) {
			/** @type {CanvasRenderingContext2D} */
			this.ctx = canvas.ctx;
			this.canvas = canvas;
			this.p1 = p1;
			this.p2 = p2;
			this.canvas.renderList.push(this);
			this.active = p2 == null;
			if (this.active) nodeMachine.activeWire = this;
			document.addEventListener("mousemove", this.saveMousePos.bind(this));
		}

		pop() {
			if (nodeMachine.activeWire == null) {
				this.active = true;
				this.p2 = null;
				nodeMachine.activeWire = this;
			}
		}

		saveMousePos(e) {
			this.mx = e.clientX;
			this.my = e.clientY;
		}

		render() {
			const pt1 = this.p1.getBoundingClientRect();
			const x1 = pt1.left;
			const y1 = pt1.top;
			let x2, y2;
			if (!this.active) {
				const pt2 = this.p2.getBoundingClientRect();
				x2 = pt2.left;
				y2 = pt2.top;
			} else {
				x2 = this.mx;
				y2 = this.my;
			}

			this.ctx.strokeStyle = this.active
				? this.p1.typeData.color
				: this.p1.type == this.p2.type ||
				  this.p1.type === "any" ||
				  this.p2.type === "any"
				? this.p1.typeData.color
				: nodeMachine.types.any.color;
			this.ctx.lineWidth = 5;
			if (x2) {
				this.ctx.beginPath();
				this.ctx.moveTo(x1, y1);
				const diff = x1 - x2;
				const cx = x1 - diff / 2;
				this.ctx.bezierCurveTo(cx + 30, y1, cx - 30, y2, x2, y2);
				this.ctx.stroke();

				return {
					type: "wire",
					active: this.active,
					p1: { x: x1, y: y1 },
					p2: { x: x2, y: y2 }
				};
			}
		}
	},

	activeWire: null,

	CTXMenuElement: class CTXMenuElement extends HTMLElement {
		constructor(menu) {
			super();
			this.attachShadow({ mode: "open" });

			const container = document.createElement("div");
			container.classList.add("container");

			let submenus = {};

			menu.forEach((node) => {
				if (node.submenu) {
					let menuContainer;
					if (!Object.keys(submenus).includes(node.submenu)) {
						const menuEl = document.createElement("div");
						menuEl.innerText = node.submenu;
						menuEl.classList.add("menu-item", "submenu");

						menuContainer = document.createElement("div");
						menuContainer.classList.add("container");
						menuEl.appendChild(menuContainer);

						container.appendChild(menuEl);
						submenus[node.submenu] = menuContainer;
					} else menuContainer = submenus[node.submenu];

					const el = document.createElement("div");
					el.innerText = node.title;
					el.classList.add("menu-item");
					el.addEventListener("click", node.callback);

					menuContainer.appendChild(el);
				} else {
					const el = document.createElement("div");
					el.innerText = node.title;
					el.classList.add("menu-item");
					el.addEventListener("click", node.callback);

					container.appendChild(el);
				}
			});

			const style = document.createElement("link");
			style.href = "css/ctx-menu.css";
			style.rel = "stylesheet";

			this.shadowRoot.append(style, container);

			document.addEventListener("click", () => this.remove());
		}
	},

	CanvasElement: class CanvasElement extends HTMLDivElement {
		constructor() {
			super();
			this.style.height = "100%";
			this.style.fontFamily = "sans-serif";
			this.menu = null;
			this.addEventListener("contextmenu", this.ctxMenu);
			window.addEventListener("resize", () =>
				alert("Document changed size. Press CMD+R to fix rendering.")
			);
			this.renderList = [];
		}

		connectedCallback() {
			this.canvas = this.appendChild(document.createElement("canvas"));
			this.canvas.style.zIndex = -1;
			this.canvas.width = this.clientWidth;
			this.canvas.height = this.clientHeight;
			this.ctx = this.canvas.getContext("2d");
			this.update();
		}

		update() {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.renderList.forEach((o) => o.render());
			requestAnimationFrame(this.update.bind(this));
		}

		ctxMenu = (e) => {
			e.preventDefault();

			if (this.menu) this.menu.remove();
			const menu = [];
			const canvas = this;
			Object.entries(nodeMachine.nodes).forEach(
				([node, { title, category }]) => {
					if (category == null)
						menu.push({
							title,
							callback() {
								const el = new nodeMachine.NodeElement(node);
								el.style.left = e.clientX;
								el.style.top = e.clientY;
								canvas.appendChild(el);
							}
						});
					else
						menu.push({
							title,
							submenu: category[0].toUpperCase() + category.slice(1),
							callback() {
								const el = new nodeMachine.NodeElement(node);
								el.style.left = e.clientX;
								el.style.top = e.clientY;
								canvas.appendChild(el);
							}
						});
				}
			);
			this.menu = new nodeMachine.CTXMenuElement(menu);
			this.menu.style = `position: absolute; left: ${e.clientX}; top: ${e.clientY}`;
			this.appendChild(this.menu);
		};

		/**
		 * Runs node.
		 *
		 * @param {HTMLElement} node
		 * @return {*}
		 */
		runNode(node) {
			const processed = [];
			const process = function (node) {
				if (node.value == null) {
					const typeData = nodeMachine.nodes[node.type];
					let inputs = [];

					if (typeData.inputs) {
						node.shadowRoot
							.querySelectorAll(".io.in:not(.flow) nm-pin")
							.forEach((pin) => {
								/** @type {HTMLElement} */
								const output = this.renderList.find((w) => w.p2 === pin).p1;
								const outputIndex = Array.from(
									output.node.shadowRoot.querySelectorAll(
										".io.out:not(.flow) nm-pin"
									)
								).indexOf(output);

								inputs.push((process(output.node) ?? [])[outputIndex]);
							});
						typeData.inputs.forEach(({ type }, i) => {
							inputs[i] = nodeMachine.types[type].processor(inputs[i]);
						});
					}

					const outputs = typeData.run?.(inputs, node);
					node.value = outputs;

					if (typeData.outputs?.find((o) => o.type === "flow")) {
						const pins = node.shadowRoot.querySelectorAll(".io.out nm-pin");

						pins.forEach((pin, i) => {
							if (pin.type === "flow") {
								const output = this.renderList.find((w) => w.p1 === pin)?.p2;
								if (output && (outputs?.[i] ?? true)) process(output.node);
							}
						});
					}

					processed.push(node);
					return outputs;
				} else {
					return node.value;
				}
			}.bind(this);

			process(node);
			processed.forEach((node) => (node.value = null));
		}

		getURL() {
			const data = this.renderList.map((o) => o.render());
			return `${location.href.split("?")[0]}?d=${btoa(JSON.stringify(data))}`;
		}
	},

	init(types, nodes) {
		// Types
		this.types = {
			any: {
				color: "lightgray",
				processor(value) {
					return value;
				}
			},
			...types
		};
		this.nodes = {
			...nodes,
			...Object.fromEntries(
				Object.entries(types)
					.map(([name, data]) => [
						name,
						data.createNode ?? true
							? {
									showTitle: false,
									title: name[0].toUpperCase() + name.slice(1),
									category: name,
									outputs: [{ input: true, type: name, name }],
									run(_inputs, node) {
										return [
											data.processor(
												node.shadowRoot.querySelector("input").value
											)
										];
									}
							  }
							: null
					])
					.filter(([, data]) => data != null)
			)
		};

		// Custom Elements
		customElements.define("nm-pin", nodeMachine.PinElement);
		customElements.define("nm-node", nodeMachine.NodeElement);
		customElements.define("nm-ctx-menu", nodeMachine.CTXMenuElement);
		customElements.define("nm-canvas", nodeMachine.CanvasElement, {
			extends: "div"
		});

		// Load
		const url = new URLSearchParams(location.search);

		if (url.has("d")) {
			const data = JSON.parse(atob(url.get("d")));

			data
				.filter((o) => o.type === "node")
				.forEach((data) => {
					const el = new this.NodeElement(data.node);
					el.style = `position: absolute;left:${data.position.x};top:${data.position.y};`;
					if (data.value)
						el.shadowRoot.querySelector("input").value = data.value;
					document.querySelector("div[is=nm-canvas]").appendChild(el);
				});

			setTimeout(() => {
				data
					.filter((o) => o.type === "wire")
					.forEach((data) => {
						const p1 = document
							.elementFromPoint(data.p1.x, data.p1.y)
							.shadowRoot.elementFromPoint(data.p1.x, data.p1.y);
						const p2 = document
							.elementFromPoint(data.p2.x, data.p2.y)
							.shadowRoot.elementFromPoint(data.p2.x, data.p2.y);
						const wire = new this.Wire(
							document.querySelector("div[is=nm-canvas]"),
							p1,
							p2
						);

						if (p2.type === "any")
							p2.el.style.backgroundColor = p1.el.style.backgroundColor;
					});
			}, 100);
		}

		// Save
		document.addEventListener("keydown", (e) => {
			if (e.key === "s" && e.metaKey) {
				e.preventDefault();
				location.href = document.querySelector("div[is=nm-canvas]").getURL();
			}
		});
	}
};

nodeMachine.init(types, nodes);
