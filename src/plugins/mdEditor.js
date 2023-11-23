import bytemdPluginDFM from "@bytemd/plugin-gfm";
import bytemdPluginFrontmatter from "@bytemd/plugin-frontmatter";
import bytemdPluginHighlight from "@bytemd/plugin-highlight";
import mermaid from "@bytemd/plugin-mermaid";
import breaks from "@bytemd/plugin-breaks";
import gemoji from "@bytemd/plugin-gemoji";
import "highlight.js/styles/atom-one-light.css";
import "bytemd/dist/index.css";

export { Editor, Viewer } from "@bytemd/react";

export const plugins = [
  bytemdPluginDFM(),
  bytemdPluginFrontmatter(),
  bytemdPluginHighlight(),
  mermaid(),
  breaks(),
  gemoji(),
];
