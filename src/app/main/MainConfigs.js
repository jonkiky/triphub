import React from 'react';
import about from './about/AboutView';
import error404 from './errors/404';
import search from './search/SearchController';
import home from './home/HomeController';
import place from './detail/DetailController'

const Config = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/search',
			component: search
		},
		{
			path: '/home',
			component: home
		},
		{
			path: '/place',
			component: place
		},
		{
			path: '/errors/404',
			component: error404
		}
	]
};

export default Config;
