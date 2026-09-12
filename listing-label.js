window.listingLabel = function(item) {
  if (item.tag === 'tech') return item.price <= 25 ? 'DEAL' : item.price >= 150 ? 'HIGH SPEC' : 'UPGRADE';
  if (item.price <= 20) return 'DISCOUNT';
  if (item.price >= 150) return 'ARCHIVE';
  return ['FTP Velour Zip-Up Track Jacket', 'Nike Travis Scott Dunks', 'Black Goth Money Records Tee'].includes(item.title) ? 'HOT' : '';
};
