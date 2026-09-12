(function(root){
  var clothingTypes = [
    {match: /\b(tee|tees|t[ -]?shirts?|shirts?|jerseys?)\b/, tags: 'shirt shirts tee tees tshirt tshirts t-shirt t-shirts tops top'},
    {match: /\bhoodies?\b/, tags: 'hoodie hoodies hooded sweatshirt sweatshirts sweater sweaters pullover tops top'},
    {match: /\bsweatshirts?\b/, tags: 'sweatshirt sweatshirts sweater sweaters pullover tops top'},
    {match: /\b(sweaters?|knit|knitwear|cardigans?)\b/, tags: 'sweater sweaters knit knitwear jumper jumpers tops top'},
    {match: /\b(jackets?|coats?|windbreakers?|parkas?)\b/, tags: 'jacket jackets coat coats outerwear'},
    {match: /\bjeans?\b/, tags: 'jean jeans denim pants trousers bottoms'},
    {match: /\b(pants?|trousers?|joggers?|sweatpants)\b/, tags: 'pants pant trousers bottoms'},
    {match: /\bcargo\b/, tags: 'cargo cargos'},
    {match: /\bshorts?\b/, tags: 'short shorts bottoms'},
    {match: /\b(sneakers?|trainers?|dunks?|shoes?)\b/, tags: 'shoe shoes sneaker sneakers trainer trainers footwear kicks'},
    {match: /\bboots?\b/, tags: 'boot boots shoe shoes footwear'},
    {match: /\b(hats?|caps?|beanies?)\b/, tags: 'hat hats cap caps headwear accessories'},
    {match: /\b(bags?|backpacks?|purses?)\b/, tags: 'bag bags accessories'},
    {match: /\bbelts?\b/, tags: 'belt belts accessories'},
    {match: /\b(dresses?|skirts?)\b/, tags: 'dress dresses skirt skirts'},
    {match: /\b(socks?)\b/, tags: 'sock socks accessories'},
    {match: /\b(necklaces?|bracelets?|rings?|earrings?)\b/, tags: 'jewelry jewellery accessories'}
  ];
  root.archiveSearchText = function(item){
    var text = (item.title + ' ' + item.tag).toLowerCase();
    var tags = item.tag === 'tech' ? 'ebay hardware electronics' : 'depop clothing';
    if(item.tag !== 'tech') clothingTypes.forEach(function(type){
      if(type.match.test(text)) tags += ' ' + type.tags;
    });
    return text + ' ' + tags + ' ' + (item.searchTags || '').toLowerCase();
  };
})(typeof window === 'undefined' ? globalThis : window);
