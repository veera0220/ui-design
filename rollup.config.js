import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";

export default [
  // CJS build
  {
    input: "src/index.ts",
    output: {
      dir: "dist/cjs",
      format: "cjs",
      sourcemap: true,
      exports: "named",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist/cjs/types",
        rootDir: "src",
      }),
      terser(),
    ],
    external: ["react", "react-dom", "react/jsx-runtime"],
  },
  // ESM build
  {
    input: "src/index.ts",
    output: {
      dir: "dist/esm",
      format: "esm",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        rootDir: "src",
      }),
      terser(),
    ],
    external: ["react", "react-dom", "react/jsx-runtime"],
  },
  // Type declarations bundle
  {
    input: "dist/cjs/types/index.d.ts",
    output: [{ file: "dist/types/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
