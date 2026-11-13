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
    };
    codes: {
        alpha_3: string;
    };
    flag: {
        url_svg: string;
    };
    region: string;
    population: number;
    capitals: { name: string }[];
}