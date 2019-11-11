import { JsonViewerNodeType } from './json-viewer-node-type.enum';

export interface IJsonViewerNode {
  readonly key: string;
  readonly value?: any;
  type?: JsonViewerNodeType;
  description: string;
  expanded?: boolean;
  expandable?: boolean;
}
