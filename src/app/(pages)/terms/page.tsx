import PageHeader from "@/components/page-header";
import AnimatedSection from "@/components/animated-section";
import markdownToHtml from "@/lib/markdownToHtml";
import { cn } from "@/lib/utils";
import markdownStyles from "@/styles/markdown-styles.module.css";

const terms = `\n\n\n\n\n

MIT License

Copyright (c) 2025 Nati Cabti

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

async function Terms() {
  const content = await markdownToHtml(terms || "");

  return (
    <article>
      <AnimatedSection id="terms">
        <PageHeader header="License Code" />
      </AnimatedSection>
      <div className="tech-badges-container">
        <div className="tech-badge">
          <img
            src="https://img.shields.io/badge/Framework-Next.js-informational?style=flat&logo=next.js&color=000000"
            alt="Next.js"
          />
        </div>
        <div className="tech-badge">
          <img
            src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"
            alt="Next.js"
          />
        </div>
        <div className="tech-badge">
          <img
            src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"
            alt="TypeScript"
          />
        </div>
        <div className="tech-badge">
          <img
            src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"
            alt="React"
          />
        </div>
        <div className="tech-badge">
          <img
            src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"
            alt="Tailwind CSS"
          />
        </div>
        <div className="tech-badge">
          <img
            src="https://img.shields.io/badge/TinaCMS-302454?style=for-the-badge&logo=tinacms&logoColor=white"
            alt="TinaCMS"
          />
        </div>
      </div>
      <div
        className={cn(markdownStyles["markdown"])}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}

export default Terms;
