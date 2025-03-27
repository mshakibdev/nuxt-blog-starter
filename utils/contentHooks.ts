import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

export default function transformMarkdown(content: ParsedContent) {
  if (!content.body || !Array.isArray(content.body.children)) return;

  let totalText = "";
  const flatNodes: any[] = [];

  // Helper function to extract text and flatten nodes
  function traverseNodes(node: any) {
    if (["p", "h2", "h3"].includes(node.tag)) {
      flatNodes.push(node);
      if (node.children) {
        totalText += extractText(node);
      }
    }
    if (node.children) {
      node.children.forEach(traverseNodes);
    }
  }

  function extractText(node: any): string {
    if (typeof node.value === "string") return node.value;
    if (node.children) return node.children.map(extractText).join("");
    return "";
  }

  traverseNodes(content.body);

  const targetLength = totalText.length * 0.3; // 30% mark
  let currentLength = 0;
  let insertIndex = -1;

  // Find the closest paragraph to 30% of text length
  for (let i = 0; i < flatNodes.length; i++) {
    currentLength += extractText(flatNodes[i]).length;
    if (currentLength >= targetLength) {
      insertIndex = i + 1;
      break;
    }
  }

  // Insert CTA component
  if (insertIndex !== -1 && insertIndex < flatNodes.length) {
    flatNodes.splice(insertIndex, 0, {
      tag: "CtaButton",
      props: { text: "Sign Up Now", link: "/signup" },
      children: [],
    });
  }

  // Reassign the modified nodes back to content
  content.body.children = flatNodes;
}
