import React from 'react';
import './App.css';
import { Table, Tag, Input, Descriptions } from 'antd';
import * as VideoReader from './component/VideoReader';
import * as OBU from './component/OUB'

export class App extends React.Component<any> {
  state: Readonly<{
    pkg: any[]
  }> = {
      pkg: []
    };

  file?: FileReader;
  obu_type: Map<number, string>;

  constructor(prop: any) {
    super(prop);

    this.obu_type = new Map();
    this.obu_type.set(OBU.OBU_SEQUENCE_HEADER, "OBU_SEQUENCE_HEADER");
    this.obu_type.set(OBU.OBU_TEMPORAL_DELIMITER, "OBU_TEMPORAL_DELIMITER");
    this.obu_type.set(OBU.OBU_FRAME_HEADER, "OBU_FRAME_HEADER");
    this.obu_type.set(OBU.OBU_TILE_GROUP, "OBU_TILE_GROUP");
    this.obu_type.set(OBU.OBU_METADATA, "OBU_METADATA");
    this.obu_type.set(OBU.OBU_FRAME, "OBU_FRAME");
    this.obu_type.set(OBU.OBU_REDUNDANT_FRAME_HEADER, "OBU_REDUNDANT_FRAME_HEADER");
    this.obu_type.set(OBU.OBU_TILE_LIST, "OBU_TILE_LIST");
    this.obu_type.set(OBU.OBU_PADDING, "OBU_PADDING");
  }

  render(): React.ReactNode {
    return (
      <div className="App">
        <header className="App-header">
          <Input type="file" style={{ width: "20%" }} onChange={e => {
            if (e)
              this.onOpen(e);
          }}>
          </Input>
          {
            this.state.pkg.length != 0 && this.randerPackage()
          }
        </header>
      </div >
    );
  }

  randerPackage() {
    let data = this.state.pkg[0];
    if (data["@type"] == "IVF Header") {
      return this.randerIVF();
    } else if (data["@type"] == "ftyp") {
      return this.renderMP4();
    }
  }

  randerIVF() {
    let key = 0;
    let pkgIndex = 1;
    let frameIndex = 1;
    let datas: any = [];
    console.info("pkg", this.state.pkg);
    for (let p of this.state.pkg) {
      datas.push({
        key: key++,
        type: p['@type'],
        package: pkgIndex,
        length: p['@length'],
        offset: p['@offset'].toString(16).padStart(8, '0'),
        values: p
      });

      for (let k of Object.keys(p)) {
        if (k.indexOf("@") == 0) continue;
        if (k != "obu") continue;
        for (let obu of p[k]) {
          datas.push({
            key: key++,
            type: this.obu_type.get(obu.obu_type),
            length: obu['@length'],
            offset: (p['@offset'] + obu['@offset'] + 12).toString(16).padStart(8, '0'),
            frame: obu['frame_type'] == undefined ? undefined : frameIndex++,
            values: obu
          });
        }
      }
      pkgIndex++;
    }

    return (
      <Table dataSource={datas} size={"small"} pagination={false}
        expandable={{
          expandedRowRender: (record) => {
            if (!record["@expanded"]) return;
            let values = record.values;
            return (
              <Descriptions column={1} size="small">
                {
                  Object.keys(values).map((key: string, index: number, array: string[]) => {
                    if (key.indexOf("#") == 0) return;
                    if (key.indexOf("@") == 0) return;
                    if (key[0] >= "A" && key[0] <= "Z") return;
                    if (typeof values[key] == "object") return;
                    return <Descriptions.Item key={index} label={key} >{values[key]}</Descriptions.Item>;
                  })
                }
              </Descriptions>
            );
          },
          onExpand: (expanded, record) => {
            record['@expanded'] = expanded;
          },
          rowExpandable: (record) => true,
          expandRowByClick: true,
        }}>
        <Table.Column title="包" dataIndex="package" key="package" />
        <Table.Column title="帧" dataIndex="frame" key="frame" />
        <Table.Column title="偏移" dataIndex="offset" key="offset" />
        <Table.Column title="长度" dataIndex="length" key="length" />
        <Table.Column title="类型" dataIndex="type" key="type" />
      </Table>);
  }

  renderMP4() {
    let key = 0;
    let pkgIndex = 1;
    let frameIndex = 1;
    let datas: any = [];
    console.info("pkg", this.state.pkg);

    let show = function (pkg: any) {
      for (let p of pkg) {
        datas.push({
          key: key++,
          type: p['@type'],
          package: pkgIndex,
          length: p['@length'],
          offset: p['@offset'].toString(16).padStart(8, '0'),
          values: p
        });
        if (p.box) show(p.box);
      }
    }
    show(this.state.pkg);
    return (
      <Table dataSource={datas} size={"small"} pagination={false}
        expandable={{
          expandedRowRender: (record) => {
            if (!record["@expanded"]) return;
            let values = record.values;
            return (
              <Descriptions column={1} size="small">
                {
                  Object.keys(values).map((key: string, index: number, array: string[]) => {
                    if (key.indexOf("#") == 0) return;
                    if (key.indexOf("@") == 0) return;
                    if (key[0] >= "A" && key[0] <= "Z") return;
                    if (typeof values[key] == "object") return;
                    return <Descriptions.Item key={index} label={key} >{values[key]}</Descriptions.Item>;
                  })
                }
              </Descriptions>
            );
          },
          onExpand: (expanded, record) => {
            record['@expanded'] = expanded;
          },
          rowExpandable: (record) => true,
          expandRowByClick: true,
        }}>
        <Table.Column title="包" dataIndex="package" key="package" />
        <Table.Column title="帧" dataIndex="frame" key="frame" />
        <Table.Column title="偏移" dataIndex="offset" key="offset" />
        <Table.Column title="长度" dataIndex="length" key="length" />
        <Table.Column title="类型" dataIndex="type" key="type" />
      </Table>);
  }

  onOpen(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    let this_ = this;
    let filename = e.target.files[0];
    this.file = new FileReader();
    this.file.onloadend = function (ev) {
      if (!ev.target) return;
      console.info("onOpen");

      let data = ev.target.result;

      let buf = new Uint8Array(data as ArrayBuffer);
      let pkg = VideoReader.parser(buf);
      this_.setState({ pkg });
    }
    this.file.readAsArrayBuffer(filename);
  }
}