import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, "$3")
  .replace(/^\w/, (m) => m)
  .replace(/-\w/g, (m) => m[1]);

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.module.replace(".mjs", ".d.ts"),
      },
    ],
    plugins: [dts()],
  },
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.module,
        format: "es",
        sourcemap: true,
        plugins: [terser()],
      },
      {
        file: pkg.module.replace(".mjs", ".min.js"),
        format: "umd",
        sourcemap: true,
        name,
        plugins: [terser()],
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        module: "ESNext",
      }),
    ],
  },
];
