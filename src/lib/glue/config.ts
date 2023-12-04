import type { IPrivateNav, IPublicNav } from '$lib/types/glue/nav.type';

export const APP_NAME = 'Jay';
export const PUBLIC_NAVS: IPublicNav[] = [
	{
		label: 'Experience',
		path: '#experience'
	},
	{
		label: 'Projects',
		path: '#projects'
	},
	{
		label: 'Contact',
		path: '#contact'
	}
];
export const PRIVATE_NAVS: IPrivateNav[] = [];
export const IS_GOOGLE_AUTH_ONLY = true;
export const IS_ENFORCE_CORNELL_EMAIL = true;
export const IS_BETA = false;
export const SENTRY_DSN_PUBLIC = '';
