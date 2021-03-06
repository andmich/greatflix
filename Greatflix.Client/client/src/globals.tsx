export enum TMDbMediaType {
    all = 0,
    movie = 1,
    tv = 2,
    person = 3
};

export enum TMDbTimeWindow {
    unknown = 0,
    day = 1,
    week = 2
}

export const MovieCategories = {
    'now-playing': 'Now Playing',
    'popular': 'Popular',
    'top-rated': 'Top Rated',
    'upcoming': 'Upcoming'
};

export const TVShowCategories = {
    'on-today': 'On Today',
    'on-air': 'On Air',
    'popular': 'Popular',
    'top-rated': 'Top Rated',
};

export const MoviePictureHeights = {
    'w92': '92px',
    'w154': '152px',
    'w185':'185px',
    'w342':'342px',
    'w500':'500px',
    'w780':'780px',
};

export interface BasicMovieGenreListProps {
    [key: string]: number
}

export const BasicMovieGenreList: BasicMovieGenreListProps = {
    'Horror': 27,
    'Action': 28,
    'Crime': 80,
    'Comedy': 35,
    'Drama': 18,
};

export const BasicTVShowGenreList = {
    'Sci-Fi & Fantasy': 10765,
    'Action': 28,
    'Crime': 80,
    'Comedy': 35,
    'Drama': 18,
}

export const TMDbMovieGenres = [{
        id: 28,
        name: 'Action',
    }, {
        id: 12,
        name: 'Adventure'
    }, {
        id: 16,
        name: 'Animation'
    }, {
        id: 35,
        name: 'Comedy'
    }, {
        id: 80,
        name: 'Crime'
    }, {
        id: 99,
        name: 'Documentary'
    }, {
        id: 18,
        name: 'Drama'
    }, {
        id: 10751,
        name: 'Family'
    }, {
        id: 14,
        name: 'Fantasy'
    }, {
        id: 36,
        name: 'History'
    }, {
        id: 27,
        name: 'Horror'
    }, {
        id: 10402,
        name: 'Music'
    }, {
        id: 9648,
        name: 'Mystery'
    }, {
        id: 10749,
        name: 'Romance'
    }, {
        id: 878,
        name: 'Science Fiction'
    }, {
        id: 10770,
        name: 'TV Movie'
    }, {
        id: 53,
        name: 'Thriller'
    }, {
        id: 10752,
        name: 'War'
    }, {
        id: 37,
        name: 'Western'
    }]

export const TMDbTVGenres = [
    {
        id: 10759,
        name: 'Action & Adventure'
    },
    {
        id: 16,
        name: 'Animation'
    },
    {
        id: 35,
        name: 'Comedy'
    },
    {
        id: 80,
        name: 'Crime'
    },
    {
        id: 99,
        name: 'Documentary'
    },
    {
        id: 18,
        name: 'Drama'
    },
    {
        id: 10751,
        name: 'Family'
    },
    {
        id: 10762,
        name: 'Kids'
    },
    {
        id: 9648,
        name: 'Mystery'
    },
    {
        id: 10763,
        name: 'News'
    },
    {
        id: 10764,
        name: 'Reality'
    },
    {
        id: 10765,
        name: 'Sci-Fi & Fantasy'
    },
    {
        id: 10766,
        name: 'Soap'
    },
    {
        id: 10767,
        name: 'Talk'
    },
    {
        id: 10768,
        name: 'War & Politics'
    },
    {
        id: 37,
        name: 'Western'
    }]
