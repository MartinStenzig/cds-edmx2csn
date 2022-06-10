class TestConstants {
  EDMX_SIMPLE_STRING = `<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
  <edmx:Reference Uri="https://sap.github.io/odata-vocabularies/vocabularies/Common.xml">
    <edmx:Include Alias="Common" Namespace="com.sap.vocabularies.Common.v1"/>
  </edmx:Reference>
  <edmx:Reference Uri="https://oasis-tcs.github.io/odata-vocabularies/vocabularies/Org.OData.Core.V1.xml">
    <edmx:Include Alias="Core" Namespace="Org.OData.Core.V1"/>
  </edmx:Reference>
  <edmx:Reference Uri="https://sap.github.io/odata-vocabularies/vocabularies/UI.xml">
    <edmx:Include Alias="UI" Namespace="com.sap.vocabularies.UI.v1"/>
  </edmx:Reference>
  <edmx:DataServices>
    <Schema Namespace="ReferenceService" xmlns="http://docs.oasis-open.org/odata/ns/edm">
      <EntityContainer Name="EntityContainer">
        <EntitySet Name="TestRecords" EntityType="ReferenceService.TestRecords"/>
        <ActionImport Name="deleteAllRecs" Action="ReferenceService.deleteAllRecs"/>
      </EntityContainer>
      <EntityType Name="TestRecords">
        <Key>
          <PropertyRef Name="ID"/>
        </Key>
        <Property Name="ID" Type="Edm.Guid" Nullable="false"/>
        <Property Name="createdAt" Type="Edm.DateTimeOffset" Precision="7"/>
        <Property Name="createdBy" Type="Edm.String" MaxLength="255"/>
        <Property Name="modifiedAt" Type="Edm.DateTimeOffset" Precision="7"/>
        <Property Name="modifiedBy" Type="Edm.String" MaxLength="255"/>
        <Property Name="stringField" Type="Edm.String"/>
        <Property Name="largeStringField" Type="Edm.String"/>
        <Property Name="booleanField" Type="Edm.Boolean"/>
        <Property Name="integerField" Type="Edm.Int32"/>
        <Property Name="integer64Field" Type="Edm.Int64"/>
        <Property Name="decimalField" Type="Edm.Decimal" Scale="variable"/>
        <Property Name="doubleField" Type="Edm.Double"/>
        <Property Name="dateField" Type="Edm.Date"/>
        <Property Name="timeField" Type="Edm.TimeOfDay"/>
        <Property Name="dateTimeField" Type="Edm.DateTimeOffset"/>
        <Property Name="timeStampField" Type="Edm.DateTimeOffset" Precision="7"/>
      </EntityType>
      <Action Name="deleteAllRecs" IsBound="false"/>
      <Annotations Target="ReferenceService.TestRecords/createdAt">
        <Annotation Term="UI.HiddenFilter" Bool="true"/>
        <Annotation Term="Core.Immutable" Bool="true"/>
        <Annotation Term="Core.Computed" Bool="true"/>
        <Annotation Term="Common.Label" String="Created On"/>
      </Annotations>
      <Annotations Target="ReferenceService.TestRecords/createdBy">
        <Annotation Term="UI.HiddenFilter" Bool="true"/>
        <Annotation Term="Core.Immutable" Bool="true"/>
        <Annotation Term="Core.Computed" Bool="true"/>
        <Annotation Term="Core.Description" String="User's unique ID"/>
        <Annotation Term="Common.Label" String="Created By"/>
      </Annotations>
      <Annotations Target="ReferenceService.TestRecords/modifiedAt">
        <Annotation Term="UI.HiddenFilter" Bool="true"/>
        <Annotation Term="Core.Computed" Bool="true"/>
        <Annotation Term="Common.Label" String="Changed On"/>
      </Annotations>
      <Annotations Target="ReferenceService.TestRecords/modifiedBy">
        <Annotation Term="UI.HiddenFilter" Bool="true"/>
        <Annotation Term="Core.Computed" Bool="true"/>
        <Annotation Term="Core.Description" String="User's unique ID"/>
        <Annotation Term="Common.Label" String="Changed By"/>
      </Annotations>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`
  EDMX_SIMPLE_CSN = { meta: { creator: 'cds-dk 4.9.7' }, $version: '2.0', definitions: { 'ReferenceService.deleteAllRecs': { kind: 'action' }, 'ReferenceService.TestRecords': { kind: 'entity', '@cds.persistence.skip': true, elements: { ID: { key: true, type: 'cds.UUID' }, createdAt: { type: 'cds.Timestamp', '@odata.precision': 7, '@odata.type': 'Edm.DateTimeOffset' }, createdBy: { type: 'cds.String', length: 255, doc: "User's unique ID" }, modifiedAt: { type: 'cds.Timestamp', '@odata.precision': 7, '@odata.type': 'Edm.DateTimeOffset' }, modifiedBy: { type: 'cds.String', length: 255, doc: "User's unique ID" }, stringField: { type: 'cds.LargeString' }, largeStringField: { type: 'cds.LargeString' }, booleanField: { type: 'cds.Boolean' }, integerField: { type: 'cds.Integer' }, integer64Field: { type: 'cds.Integer64' }, decimalField: { type: 'cds.DecimalFloat' }, doubleField: { type: 'cds.Double' }, dateField: { type: 'cds.Date' }, timeField: { type: 'cds.Time' }, dateTimeField: { type: 'cds.DateTime', '@odata.precision': 0, '@odata.type': 'Edm.DateTimeOffset' }, timeStampField: { type: 'cds.Timestamp', '@odata.precision': 7, '@odata.type': 'Edm.DateTimeOffset' } } }, ReferenceService: { kind: 'service', '@cds.external': true } } }
  EDMX_SIMPLE_CSN_MYSERVICE_OVERRIDE = { meta: { creator: 'cds-dk 4.9.7' }, $version: '2.0', definitions: { 'MyService.deleteAllRecs': { kind: 'action' }, 'MyService.TestRecords': { kind: 'entity', '@cds.persistence.skip': true, elements: { ID: { key: true, type: 'cds.UUID' }, createdAt: { type: 'cds.Timestamp', '@odata.precision': 7, '@odata.type': 'Edm.DateTimeOffset' }, createdBy: { type: 'cds.String', length: 255, doc: "User's unique ID" }, modifiedAt: { type: 'cds.Timestamp', '@odata.precision': 7, '@odata.type': 'Edm.DateTimeOffset' }, modifiedBy: { type: 'cds.String', length: 255, doc: "User's unique ID" }, stringField: { type: 'cds.LargeString' }, largeStringField: { type: 'cds.LargeString' }, booleanField: { type: 'cds.Boolean' }, integerField: { type: 'cds.Integer' }, integer64Field: { type: 'cds.Integer64' }, decimalField: { type: 'cds.DecimalFloat' }, doubleField: { type: 'cds.Double' }, dateField: { type: 'cds.Date' }, timeField: { type: 'cds.Time' }, dateTimeField: { type: 'cds.DateTime', '@odata.precision': 0, '@odata.type': 'Edm.DateTimeOffset' }, timeStampField: { type: 'cds.Timestamp', '@odata.precision': 7, '@odata.type': 'Edm.DateTimeOffset' } } }, MyService: { kind: 'service', '@cds.external': true } } }
}

module.exports = new TestConstants()
