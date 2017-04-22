const { XmlEntities } = require('html-entities');

const entities = new XmlEntities();

console.log(entities.encode('<script>document.cookie</script>'));