const getFacebookPageRoutes = async (pageName, pageSection = "about") => {
  const pages = [
    {
      name: "about",
      url: "/about_profile_transparency/",
    },
    {
      name: "contact",
      url: "/about_contact_and_basic_info/",
    },
    //TODO: reviews -> Pendiente de implementar
    {
      name: "reviews",
      url: "/reviews/",
    },
  ];

  const page = pages.find((page) => page.name === pageSection);
  return `https://www.facebook.com/${pageName}${page.url}`;
};

module.exports = { getFacebookPageRoutes };
