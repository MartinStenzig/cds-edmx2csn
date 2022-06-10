# edmx2csn

[![npm version](https://badge.fury.io/js/edmx2csn.svg)](https://badge.fury.io/js/edmx2csn)
[![npm downloads](https://img.shields.io/npm/dm/edmx2csn)](https://www.npmjs.com/package/edmx2csn)

This tool allows for easy conversion of EDMX to the SAP CSN format. 

It can be use as a) node package or as b) command line tool.

## Use as node package
To install and use the package as part of your node project, run the following command: 
```bash    
npm i edmx2csn
```

**Example 1 - Convert Edmx String to CSN**
```javascript
const EdmxConverter = require('edmx2csn');

const edmxString = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:DataServices>
    <Schema Namespace="CustomerService" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityContainer Name="EntityContainer">
        <EntitySet Name="Customers" EntityType="CustomerService.Customers"/>
      </EntityContainer>
      <EntityType Name="Customers">
        <Key>
          <PropertyRef Name="id"/>
        </Key>
        <Property Name="id" Type="Edm.Guid" Nullable="false"/>
        <Property Name="nr" Type="Edm.Int32"/>
        <Property Name="lastname" Type="Edm.String" MaxLength="1000"/>
        <Property Name="firstname" Type="Edm.String" MaxLength="1000"/>
      </EntityType>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`

new EdmxConverter().convert(edmxString).then((csn) => {
    console.log(csn);
})
```

**Example 2 - retrieve metadata from a url and convert it**

```javascript
const EdmxConverter = require('edmx2csn');

const myUrl = 'https://services.odata.org/v4/northwind/northwind.svc/$metadata'
   
new EdmxConverter({url:myUrl}).convert().then((csn) => {
    console.log(csn);
})
```
## Command line usage
Initial installation command:

`npm i -g edmx2csn`

Following the global installation you can run the tool with options:
- -- help to get an overview of all available commands 
- -u to access a url, retrieve the metadata and convert it 
- -f to read and convert an EDMX file to CSN

**Example 1 - retrieve metadata from a url**

*Make sure to escape special characters in the url as in the example of the $ in front of metadata.*

`edmx2csn -u https://services.odata.org/v4/northwind/northwind.svc/\$metadata`

**Example 2 - Pipe Metadata into tool and pretty with jq**

*Make sure to escape special characters in the url as in the example of the $ in front of metadata.*

`curl https://services.odata.org/v4/northwind/northwind.svc/\$metadata | ./bin/cli.js | jq`



