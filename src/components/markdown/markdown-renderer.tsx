import "@/styles/markdown-alert.css";
import "katex/dist/katex.min.css"; // Import KaTeX CSS

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { rehypeGithubAlerts } from "rehype-github-alerts";
import rehypeKatex from "rehype-katex"; // Import rehype-katex

import Anchor from "./anchor";
import BlockQuote from "./block-quote";
import CodeBlock from "./code-block";
import MarkdownImage from "./markdown-image";
import Paragraph from "./paragraph";
import AnchorHeader from "./anchor-header";

interface MarkdownRendererProps {
  className?: string;
  content: string;
  enableMath?: boolean; // Add prop to conditionally enable math rendering
}

function MarkdownRenderer({ className, content, enableMath = false }: MarkdownRendererProps) {
  const rehypePlugins = [rehypeRaw, rehypeGithubAlerts];
  return (
    <ReactMarkdown
      className={className}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={rehypePlugins} // Use the potentially modified plugins array
      components={{
        p: ({ node, children, ...props }) => (
          <Paragraph node={node} children={children} {...props} />
        ),
        a: (props) => <Anchor {...props} />,
        sup: "sup",
        sub: "sub",
        img: (props) => <MarkdownImage src={props.src ?? ""} alt={props.alt} />,
        ul: (props) => (
          <ul
            {...props}
            style={{
              paddingLeft: "1.0rem",
            }}
          />
        ),
        ol: (props) => (
          <ol
            {...props}
            style={{
              paddingLeft: "1.0rem",
            }}
          />
        ),
        li: (props) => (
          <li
            {...props}
            style={{
              marginBottom: "0.15rem",
            }}
          />
        ),
        h1: ({ children, ...props }) => (
          <AnchorHeader level={1} {...props}>
            {children}
          </AnchorHeader>
        ),
        h2: ({ children, ...props }) => (
          <AnchorHeader level={2} {...props}>
            {children}
          </AnchorHeader>
        ),
        h3: ({ children, ...props }) => (
          <AnchorHeader level={3} {...props}>
            {children}
          </AnchorHeader>
        ),
        blockquote: (props) => (
          <BlockQuote {...props}>{props.children}</BlockQuote>
        ),
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");

          return !inline && match ? (
            <CodeBlock language={match[1]}>{children}</CodeBlock>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default MarkdownRenderer;
