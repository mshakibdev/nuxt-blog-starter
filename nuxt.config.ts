// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@nuxt/content"],
  tailwindcss: {
    config: {
      plugins: [require("@tailwindcss/typography")],
    },
  },
  hooks: {
    "content:file:beforeParse": (ctx) => {
      if (ctx.file.extension === ".md" && ctx.file.path.startsWith("/blog/")) {
        insertDynamicCTAs(ctx);
      }
    },
  },
});
function insertDynamicCTAs(ctx) {
  // Ensure we have content to work with
  if (!ctx.content || typeof ctx.content !== "string") return;

  // Skip frontmatter section for position calculation
  const contentWithoutFrontmatter = ctx.content.replace(
    /^---[\s\S]*?---\n/,
    ""
  );

  // Calculate positions based on content length
  const contentLength = contentWithoutFrontmatter.length;
  const positions = [
    Math.floor(contentLength * 0.1), // 10%
    Math.floor(contentLength * 0.3), // 30%
    Math.floor(contentLength * 0.6), // 60%
    Math.floor(contentLength * 0.8), // 80%
  ];

  // Extract frontmatter for any custom CTA settings
  const frontmatterMatch = ctx.content.match(/^---\n([\s\S]*?)\n---/);
  const frontmatter = frontmatterMatch ? frontmatterMatch[1] : "";

  // Parse frontmatter to check for CTA overrides
  const disableCTAs = frontmatter.includes("disableCTAs: true");

  if (disableCTAs) return;

  // Function to get the correct CTA component for each position
  const getCTAComponent = (position) => {
    switch (position) {
      case 0:
        return "<CTAOne />";
      case 1:
        return "<CTATwo />";
      case 2:
        return "<CTAThree />";
      case 3:
        return "<CTAFour />";
      default:
        return "<CTAOne />";
    }
  };

  // Split content into paragraphs to find insertion points
  const paragraphs = contentWithoutFrontmatter.split(/\n\n+/);
  let currentPosition = 0;
  let modifiedContent = "";
  let ctaIndex = 0;

  // Add frontmatter back if it exists
  if (frontmatterMatch) {
    modifiedContent += frontmatterMatch[0] + "\n\n";
  }

  // Insert CTAs at approximate positions
  for (const paragraph of paragraphs) {
    modifiedContent += paragraph + "\n\n";
    currentPosition += paragraph.length + 2; // +2 for newlines

    // Check if we've reached a CTA insertion point
    if (ctaIndex < positions.length && currentPosition >= positions[ctaIndex]) {
      modifiedContent += getCTAComponent(ctaIndex) + "\n\n";
      ctaIndex++;
    }
  }

  // Update the content
  ctx.content = modifiedContent.trim();
}
