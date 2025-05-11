import { Plugin } from 'vite';
import { writeFileSync } from 'fs';
import path from 'path';

export function generateManifest(): Plugin {
  return {
    name: 'generate-manifest',
    writeBundle(options, bundle) {
      const manifest = {};
      
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'chunk') {
          manifest[fileName] = {
            file: fileName,
            src: chunk.facadeModuleId,
            isEntry: chunk.isEntry,
            isDynamicEntry: chunk.isDynamicEntry,
          };
        } else if (chunk.type === 'asset') {
          manifest[fileName] = {
            file: fileName,
            src: chunk.name,
          };
        }
      }

      writeFileSync(
        path.join(options.dir, 'manifest.json'),
        JSON.stringify(manifest, null, 2)
      );
    },
  };
}