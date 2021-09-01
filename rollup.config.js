import { dirname } from "path";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import esmImportToUrl from "rollup-plugin-esm-import-to-url";
import pkg from "./package.json";

const input = "src/index.ts",
  commonPlugins = [
    resolve({ browser: true }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.esm.json",
    }),
  ];

export default [
  {
    input,
    output: [
      {
        file: pkg.browser,
        format: "es",
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      esmImportToUrl({
        imports: {
          tslib: "https://unpkg.com/tslib@2/tslib.es6.js",
        },
      }),
      ...commonPlugins,
    ],
  },
  {
    input,
    output: [
      {
        dir: dirname(pkg.module),
        format: "es",
        sourcemap: false,
        preserveModules: true,
      },
    ],
    plugins: commonPlugins,
  },
];
