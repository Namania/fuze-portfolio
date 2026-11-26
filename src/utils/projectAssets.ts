type AssetKind = 'cover' | 'logo'

const assets = import.meta.glob<string>('@/assets/projects/*', {
  eager: true,
  import: 'default',
})

export function findProjectAsset(projectId: string, kind: AssetKind) {
  const entry = Object.entries(assets).find(([path]) => path.includes(`/${projectId}-${kind}.`))
  return entry?.[1]
}
