import { globSync } from 'glob';
import * as esbuild from 'esbuild';
import * as tsup from 'tsup';
import * as path from 'path';

async function build(pathName) {
  //windows 下的系统路径兼容，如果是linux 或者mac 将下方代码注释掉
  pathName = pathName.split(path.sep).join('/');
  console.log(`Building ${pathName}`);
  let file = `${pathName}/src/index.ts`;
  let dist = `${pathName}/dist`;
  console.log(`Building ${pathName}/dist/index.js and ${pathName}/dist/index.mjs`);

  const esbuildConfig = {
    entryPoints: [file],
    external: ['@radix-ui/*'], //
    packages: 'external',
    bundle: true,
    sourcemap: true,
    format: 'cjs',
    target: 'es2015',
    outdir: dist,
  };

  await esbuild.build(esbuildConfig);
  console.log(`Built ${pathName}/dist/index.js`);

  await esbuild.build({
    ...esbuildConfig,
    format: 'esm',
    outExtension: { '.js': '.mjs' },
  });
  console.log(`Built ${pathName}/dist/index.mjs`);

  // tsup is used to emit d.ts files only (esbuild can't do that).
  //
  // Notes:
  // 1. Emitting d.ts files is super slow for whatever reason.
  // 2. It could have fully replaced esbuild (as it uses that internally),
  //    but at the moment its esbuild version is somewhat outdated.
  //    It’s also harder to configure and esbuild docs are more thorough.
  await tsup.build({
    entry: [file],
    format: ['cjs', 'esm'],
    dts: { only: true },
    outDir: dist,
    silent: true,
    external: [/@radix-ui\/.+/],
  });
  console.log(`Built ${pathName}/dist/index.d.ts`);
}

//遍历'packages/下的所有目录，并逐一编译
globSync('packages/*/*').forEach(build);
