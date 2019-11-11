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
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class JsonViewerComponent implements OnInit {
  @Input()
  get json() { return this._json; }
  set json(v: any) {
    this._json = v;
  }
  private _json: any;

  @Input()
  get expanded() { return this._expanded; }
  set expanded(v: boolean) {
    this._expanded = coerceBooleanProperty(v);
  }
  private _expanded?: boolean;

  @Input()
  get root() { return this._root; }
  set root(v: boolean) {
    this._root = coerceBooleanProperty(v);
  }
  private _root = true;

  nodes: IJsonViewerNode[] = [];

  ngOnInit() {
    if (typeof this.json === 'object') {
      for (const key of Object.keys(this.json)) {
        this.nodes.push(this.parseJSON(key, this.json[key]));
      }
    } else {
      this.nodes = [this.parseJSON(`(${typeof this.json})`, this.json)];
    }
  }

  toggle(e: Event, node: IJsonViewerNode) {
    if (node.expandable) {
      e.stopImmediatePropagation();
      e.preventDefault();
      node.expanded = !node.expanded;
    }
  }

  private parseJSON(key: string, value: any) {
    const type = typeof value;
    const node: IJsonViewerNode = {
      key,
      value,
      description: `${value}`,
      expanded: this.expanded,
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
        node.description = `Array[${value.length}] ${JSON.stringify(value)}`;
      } else if (value instanceof Date) {
        node.type = JsonViewerNodeType.Date;
      } else {
        node.type = JsonViewerNodeType.Object;
        node.description = `Object ${JSON.stringify(value)}`;
      }
    }

    node.expandable = node.type === JsonViewerNodeType.Object ||
                      node.type === JsonViewerNodeType.Array;

    return node;
  }
}
