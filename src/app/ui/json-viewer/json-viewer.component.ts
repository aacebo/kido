import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { IJsonViewerNode } from './json-viewer-node.model';
import { JsonViewerNodeType } from './json-viewer-node-type.enum';

@Component({
  moduleId: module.id,
  exportAs: 'kidoJsonViewer',
  selector: 'kido-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.scss'],
  host: {
    class: 'kido-json-viewer',
    '[class.kido-json-viewer--root-node]': 'root',
    '[class.kido-json-viewer--raw]': 'raw',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class JsonViewerComponent implements OnInit {
  @Input()
  get json() { return this._json; }
  set json(v: any) {
    this._json = v;
    this.render();
  }
  private _json: any;

  @Input()
  get expanded() { return this._expanded; }
  set expanded(v: boolean) {
    this._expanded = coerceBooleanProperty(v);
  }
  private _expanded?: boolean;

  @Input()
  get deep() { return this._deep; }
  set deep(v: boolean) {
    this._deep = coerceBooleanProperty(v);
  }
  private _deep?: boolean;

  @Input()
  get root() { return this._root; }
  set root(v: boolean) {
    this._root = coerceBooleanProperty(v);
  }
  private _root = true;

  @Input()
  get raw() { return this._raw; }
  set raw(v: boolean) {
    this._raw = coerceBooleanProperty(v);
  }
  private _raw?: boolean;

  @Input()
  get toggler() { return this._toggler; }
  set toggler(v: boolean) {
    this._toggler = coerceBooleanProperty(v);
  }
  private _toggler?: boolean;

  nodes: IJsonViewerNode[] = [];
  rawJson: string;

  ngOnInit() {
    this.render();
  }

  toggle(e: Event, node: IJsonViewerNode) {
    if (node.expandable) {
      e.stopImmediatePropagation();
      e.preventDefault();
      node.expanded = !node.expanded;
    }
  }

  private stringifyJSON(json: any) {
    return JSON.stringify(json, undefined, 2);
  }

  private parseJSON(key: string, value: any) {
    const type = typeof value;
    const node: IJsonViewerNode = {
      key,
      value,
      description: `${value}`,
      expanded: this.deep ? this.expanded : false,
    };

    if (type === 'number' || type === 'bigint') {
      node.type = JsonViewerNodeType.Number;
    } else if (type === 'string') {
      node.type = JsonViewerNodeType.String;
      node.description = `"${value}"`;
    } else if (type === 'boolean') {
      node.type = JsonViewerNodeType.Boolean;
    } else if (type === 'function') {
      node.type = JsonViewerNodeType.Function;
    } else if (type === 'undefined') {
      node.type = JsonViewerNodeType.Undefined;
      node.description = 'undefined';
    } else if (type === 'object') {
      if (value === null) {
        node.type = JsonViewerNodeType.Null;
        node.description = 'null';
      } else if (Array.isArray(value)) {
        node.type = JsonViewerNodeType.Array;
        node.description = `Array[${value.length}] ${this.stringifyJSON(value)}`;
      } else if (value instanceof Date) {
        node.type = JsonViewerNodeType.Date;
      } else {
        node.type = JsonViewerNodeType.Object;
        node.description = `Object ${this.stringifyJSON(value)}`;
      }
    }

    node.expandable = node.type === JsonViewerNodeType.Object ||
                      node.type === JsonViewerNodeType.Array;

    return node;
  }

  private render() {
    this.rawJson = JSON.stringify(this.json, undefined, 4);

    if (typeof this.json === 'object') {
      this.nodes = [];

      for (const key of Object.keys(this.json)) {
        this.nodes.push(this.parseJSON(key, this.json[key]));
      }
    } else {
      this.nodes = [this.parseJSON(`(${typeof this.json})`, this.json)];
    }
  }
}
