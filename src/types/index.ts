export type Theme = 'light' | 'dark';

export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export interface Country {
    uuid: string;
    names: {
        common: string;
        official: string;
        native?: {
            eng?: { common: string };
        };
    };
    codes: {
        alpha_3: string;
    };
    flag: {
        url_svg: string;
    };
    region: string;
    subregion?: string;
    population: number;
    capitals?: { name: string }[];
    tlds?: string[];
    currencies?: { name: string }[];
    languages?: { name: string }[];
    borders?: string[];
}