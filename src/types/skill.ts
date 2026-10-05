export interface Skill {
  slug: string;
  title: string;
  desc: string;
  domain_key: string;
  domain_title: string;
  domain_icon: string;
  subgroup_key: string;
  subgroup_title: string;
  subgroup_desc: string;
  sources: string[];
  win_path: string;
  uri_path: string;
  content: string;
}

export interface Domain {
  key: string;
  title: string;
  icon: string;
  skills: Skill[];
  subgroups: Subgroup[];
}

export interface Subgroup {
  key: string;
  title: string;
  desc: string;
  skills: Skill[];
}

export interface CuratedKit {
  key: string;
  icon: string;
  title: string;
  subtitle: string;
  sizeEstimate: string;
  filterFn: (skill: Skill) => boolean;
}

export interface FlowchartStep {
  label: string;
  cmd: string;
  desc: string;
}

export interface Flowchart {
  domainKey: string;
  title: string;
  desc: string;
  code: string;
  steps: FlowchartStep[];
  skills: string[];
}

export interface Blueprint {
  slug: string;
  title: string;
  tagline: string;
  phases: [string, string][];
}

export interface Recipe {
  title: string;
  domain: string;
  steps: [string, string][];
}