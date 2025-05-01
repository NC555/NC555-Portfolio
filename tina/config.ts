// Removed unused defineConfig import
import remarkHtml from "remark-html";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";

export default {
  // contentApiUrlOverride: "/api/tina/gql",
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  markdown: {
    allowDangerousHtml: true,
    extensions: {
      footnotes: true,
      codeHighlighting: true,
    },
  },
  parser: {
    extend(options) {
      // Enable HTML in markdown
      options.allowDangerousHtml = true;

      // Add support for math expressions
      options.extensions = options.extensions || [];

      options.remarkPlugins = options.remarkPlugins || [];
      options.remarkPlugins.push(remarkMath);
      options.remarkPlugins.push(remarkHtml);

      return options;
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "_posts",
        format: "md",
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
          beforeSubmit: async ({ values }) => {
            // Clean up any problematic formatting
            return { ...values };
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            required: true,
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "object",
            name: "author",
            label: "Author",
            fields: [
              {
                type: "string",
                name: "name",
                label: "Name",
                required: true,
              },
              {
                type: "image",
                name: "picture",
                label: "Picture",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "ogImage",
            label: "Open Graph Image",
            fields: [
              {
                type: "image",
                name: "url",
                label: "URL",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "publishedAt",
            label: "Published At",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
          },
          {
            type: "image",
            name: "banner",
            label: "Banner",
          },
          {
            type: "string",
            name: "alt",
            label: "Alt Text",
          },
          {
            type: "boolean",
            name: "mathjax",
            label: "Enable MathJax",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            parser: {
              type: "markdown",
            },
          },
        ],
      },
      {
        name: "contentPost",
        label: "Content Posts",
        path: "src/contents/posts",
        format: "md",
        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },
          beforeSubmit: async ({ values }) => {
            // Clean up any problematic formatting
            return { ...values };
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            required: true,
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover Image",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "object",
            name: "author",
            label: "Author",
            fields: [
              {
                type: "string",
                name: "name",
                label: "Name",
                required: true,
              },
              {
                type: "image",
                name: "picture",
                label: "Picture",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "ogImage",
            label: "Open Graph Image",
            fields: [
              {
                type: "image",
                name: "url",
                label: "URL",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "publishedAt",
            label: "Published At",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
          },
          {
            type: "image",
            name: "banner",
            label: "Banner",
          },
          {
            type: "string",
            name: "alt",
            label: "Alt Text",
          },
          {
            type: "boolean",
            name: "mathjax",
            label: "Enable MathJax",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            parser: {
              type: "markdown",
            },
          },
        ],
      },
      {
        name: "sidebarConfig",
        label: "Sidebar Configuration",
        path: "src/data",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "sidebarConfig",
        },
        fields: [
          {
            type: "object",
            name: "profile",
            label: "Profile Information",
            fields: [
              {
                type: "string",
                name: "firstName",
                label: "First Name",
                required: true,
              },
              {
                type: "string",
                name: "lastName",
                label: "Last Name",
                required: true,
              },
              {
                type: "string",
                name: "preferredName",
                label: "Preferred Name",
                required: false,
              },
              {
                type: "string",
                name: "status",
                label: "Status",
                required: true,
              },
              {
                type: "image",
                name: "avatar",
                label: "Avatar Image",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "contacts",
            label: "Contact Information",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "content",
                label: "Content",
                required: true,
              },
              {
                type: "string",
                name: "link",
                label: "Link (optional)",
              },
              {
                type: "string",
                name: "icon",
                label: "Icon Name",
                description:
                  "Name of the icon from react-icons (e.g., LuMail, LuGithub)",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "socialLinks",
            label: "Social Links",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "Name",
                required: true,
              },
              {
                type: "string",
                name: "url",
                label: "URL",
                required: true,
              },
              {
                type: "string",
                name: "icon",
                label: "Icon Name",
                description:
                  "Name of the icon from react-icons (e.g., LuGithub, PiMediumLogoBold)",
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
};
