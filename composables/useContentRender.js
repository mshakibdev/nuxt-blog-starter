export const useContentRender = () => {
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getSortedContentNavigation = async (path = "/blog") => {
    // Use queryCollectionNavigation() instead of fetchContentNavigation()
    const navigation = await queryCollectionNavigation();
    const section = navigation.find((item) => item._path === path);
    const routes = section?.children || [];
    return routes.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  };

  return {
    formatDate,
    getSortedContentNavigation,
  };
};
