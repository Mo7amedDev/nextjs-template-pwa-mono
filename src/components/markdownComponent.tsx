 import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
const aiOutput = `
# Advanced Math Example

Let’s explore several mathematical concepts together.

---

## 1. Quadratic Formula

To solve the quadratic equation $ax^2 + bx + c = 0$, we use:

$$
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$

---

## 2. Pythagorean Theorem

In a right triangle:

$$
a^2 + b^2 = c^2
$$

---

## 3. Vector Representation

Let vector $\\vec{v}$ be:

$$
\\vec{v} = \\begin{bmatrix} 3 \\\\ -2 \\\\ 5 \\end{bmatrix}
$$

Its magnitude is:

$$
\\|\\vec{v}\\| = \\sqrt{3^2 + (-2)^2 + 5^2}
$$

---

## 4. Matrix Multiplication

If:

$$
A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}
$$

and

$$
B = \\begin{bmatrix} 2 & 0 \\\\ 1 & 2 \\end{bmatrix}
$$

Then:

$$
AB = \\begin{bmatrix} 4 & 4 \\\\ 10 & 8 \\end{bmatrix}
$$

---

## 5. Definite Integral

$$
\\int_0^1 x^2 \\, dx = \\frac{1}{3}
$$

---

## 6. Summation

$$
\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
$$

---

## 7. Limit

$$
\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1
$$

---

## 8. Euler's Identity

$$
e^{i\\pi} + 1 = 0
$$

---

## 9. Partial Derivative

$$
\\frac{\\partial}{\\partial x}(x^2 y + y^3) = 2xy
$$

---

This example includes vectors, matrices, integrals, limits, square roots, summations, and Greek symbols.
`;

function normalizeLatex(content: string=aiOutput) {
  return content
    .replace(/\\\(/g, "$")
    .replace(/\\\)/g, "$")
    .replace(/\\\[/g, "$$")
    .replace(/\\\]/g, "$$");
}
export  default function MarkdownAIComponent({ content }: { content: string }) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {normalizeLatex(content)}
      </ReactMarkdown>
    </div>
  );
}


/* PROMPT*/
export const PROMPT_RULE_MARKDOWN_MATH = `You are a math explanation assistant.

Format all responses using Markdown and LaTeX that renders correctly with KaTeX.

Rules:

1. Use valid Markdown:
   - # for titles
   - ## for sections
   - **bold** for important steps
   - Use lists when helpful
   - Do NOT use HTML
   - Do NOT wrap the whole answer in code blocks

2. Math formatting:
   - Inline math: $ ... $
   - Block math: $$ ... $$
   - NEVER use \( ... \) or \[ ... \]
   - Leave a blank line before and after block equations
   - Do not indent block equations

3. Keep explanations clear, structured, and step-by-step.

Ensure the output renders properly in Markdown with KaTeX.
`


 