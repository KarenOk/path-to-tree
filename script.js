class Node {
	constructor(value) {
		this.value = value;
		this.children = {};
	}

	addChild(value) {
		if (!this.children[value]) {
			const newNode = new Node(value);
			this.children[value] = newNode;
			return newNode;
		}
	}
}

class Tree {
	constructor() {
		this.root = new Node("");
	}

	addFilePath(filePath) {
		const docs = filePath.split("/");
		let lastNode = this.root;

		for (let doc of docs) {
			if (!doc) continue;
			if (!lastNode.children[doc]) {
				lastNode = lastNode.addChild(doc);
			} else {
				lastNode = lastNode.children[doc];
			}
		}
	}

	traverseTree() {
		let parentDocumentElem;

		const helper = (node, childrenContainer) => {
			const children = Object.keys(node.children);
			const documentElem = document.createElement("div");
			documentElem.classList.add("document");

			documentElem.innerHTML = `<span>${node.value}${
				children.length ? "/" : ""
			}</span>`;

			if (node === this.root) parentDocumentElem = documentElem;
			if (childrenContainer) childrenContainer.appendChild(documentElem);

			let childrenElem;
			if (children.length) {
				childrenElem = document.createElement("div");
				childrenElem.classList.add("children");
				documentElem.appendChild(childrenElem);
			}

			for (let child of children) {
				helper(node.children[child], childrenElem);
			}
		};

		helper(this.root);

		document.querySelector(".container").innerHTML = "";
		document.querySelector(".container").appendChild(parentDocumentElem);
	}
}

// const fileTree = new Tree();

// fileTree.addFilePath("/home/kars/pics");
// fileTree.addFilePath("/home/kars/videos/kars");
// fileTree.addFilePath("/home/kars/videos/pelums");
// fileTree.addFilePath("/home/pelums/pics");
// fileTree.addFilePath("/bin");
// fileTree.addFilePath("/etc");

// console.log(fileTree);
// fileTree.traverseTree();

const textAreaElem = document.querySelector("textarea");
const buildBtn = document.querySelector("button");

textAreaElem.value = `/home/kars/pics
/home/kars/videos/kars
/home/kars/videos/pelums
/home/pelums/pics
/bin
/etc
`;

buildBtn.addEventListener("click", () => {
	const paths = textAreaElem.value.trim();
	const splitPaths = paths.split("\n");

	const fileTree = new Tree();

	for (let path of splitPaths) {
		fileTree.addFilePath(path.trim());
	}

	fileTree.traverseTree();
});
