export type SlideMeta = {
  id: string;
  title: string;
  section?: string;
};

export type SlideComponent = React.ComponentType<{ step: number }> & {
  meta: SlideMeta;
  steps?: number;
};
