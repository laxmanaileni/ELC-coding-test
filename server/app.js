
/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data = require('./data');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const hostname  = 'localhost';
const port = 3035;

const normalizeString = (term) => { 
    return term.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}


http.createServer(function (req, res) {
    const urlparse = url.parse(req.url, true)
    const search = urlparse.search;
    let items = []
    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030');

    if (urlparse.pathname == '/products' && req.method == 'GET') {
        if (search) {
            const [, query] = urlparse.search.split('?');
            const searchTerm = normalizeString(querystring.parse(query).q);
            items = data.filter(item => {
                const name = normalizeString(item.name);
                return name.includes(searchTerm) && eval(item.isActive);
            });
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ items: items, total: data.length }, null, 2));

    } else {
        res.write("Response ...."); 
        
        res.end(); 
    }
    
    
}).listen(port);




console.log(`[Server running on ${hostname}:${port}]`);