const { DH_NOT_SUITABLE_GENERATOR } = require("constants")

let domainName = prompt("Enter domain name: ")

let domain = domainName.value

dns.lookup(domain)