// Implement the Gatsby API “onCreatePage”. This is

import { GatsbyNode } from "gatsby";
import path from "path";

// called after every page is created.
export const onCreatePage: GatsbyNode["onCreatePage"] = async ({
  page,
  actions,
}) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/account/)) {
    page.matchPath = "/account/*";

    // Update the page.
    createPage(page);
  }
};

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@services": path.resolve(__dirname, "src/services"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@templates": path.resolve(__dirname, "src/templates"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@images": path.resolve(__dirname, "src/images"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@types": path.resolve(__dirname, "src/types"),
        "@graphql": path.resolve(__dirname, "src/grapql"),
        "@plugins": path.resolve(__dirname, "src/plugins"),
      },
    },
  });
};
