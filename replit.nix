{ pkgs }: {
  deps = [
    pkgs.nodejs_latest
    pkgs.yarn
    pkgs.esbuild

    pkgs.nodePackages.typescript
    pkgs.nodePackages.typescript-language-server
  ];
}
