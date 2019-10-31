// tslint:disable-next-line
interface Window {
  require: NodeRequire;
}

// tslint:disable-next-line
interface NodeModule {
  id: string;
}

// declare var window: Window;
declare var module: NodeModule;
declare var require: NodeRequire;
