var config = {
    'timer':
            [
                {
                    'tag': 'ignition',
                    'X'  : 20,
                    'Y'  : 0.1
                },
                {
                    'tag': 'onset',
                    'X'  : 40,
                    'Y'  : 0.6
                },
                {
                    'tag': 'peak',
                    'X'  : 100,
                    'Y'  : 1
                },
                {
                    'tag': 'chillout',
                    'X'  : 220,
                    'Y'  : 0
                }
            ]
    ,
    'playlists':
            [
                {
                    'label': 'Soft/Peak',
                    'id'   : '4ILChY5F4Hn08ikt0rfHhW'
                },
                {
                    'label': 'Soft & chillig',
                    'id'   : '0r09hQ2kqiLwjStS7xzRzh'
                },
                {
                    'label': 'Tool',
                    'id'   : '54c657PnbEgWUJt7biWHtO'
                },
                {
                    'label': 'Rock',
                    'id'   : '1J2Q32HV4PbVhlhNTensBV'
                },
                {
                    'label': 'Electro',
                    'id'   : '0ZigR4WogVGwftQA7GAMhu'
                },
                {
                    'label': 'Force',
                    'id'   : '6fB9PJQ7Hy8SDvcRmBeKwr'
                }
            ]
    ,
    'selectableTags': [
        {'selectableTag': 'trippy-2D'},
        {'selectableTag': 'trippy-3D'},
        {'selectableTag': 'trippy-slow'},
        {'selectableTag': 'trippy-fast'},
        {'selectableTag': 'meditative'},
        {'selectableTag': 'space'},
        {'selectableTag': 'nature'},
        {'selectableTag': 'slideshow'},
        {'selectableTag': 'hiking'},
        {'selectableTag': 'festival'},
        {'selectableTag': 'wisdom'},
        {'selectableTag': 'leftovers'}


    ],
    'videosYoutube' : [
        /*
                {
                    'videoLink': 'https://www.youtube.com/embed/bx-0YlFprqc?mute=1',
                    'tags'     : 'trippy-slow trippy-3D'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/JKe0gryiCCw?mute=1',
                    'tags'     : 'trippy-slow trippy-3D'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/ZqvhJhi8CF4?mute=1',
                    'tags'     : 'trippy-slow trippy-3D'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/AmkZRNmLiGE?mute=1',
                    'tags'     : 'trippy-slow trippy-2D'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/0NR8_r2FmFk?mute=1',
                    'tags'     : 'trippy-slow trippy-2D'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/AITN4rs1Ev8?mute=1',
                    'tags'     : 'trippy-slow trippy-2D'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/JTbWeMQnJUE?mute=1',
                    'tags'     : 'trippy-slow trippy-2D'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/jRn3MDxESfw?mute=1',
                    'tags'     : 'trippy-slow trippy-2D'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/7jv-1iSRuN4?mute=1',
                    'tags'     : 'trippy-slow trippy-3D'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/M45c6WiZ2tc?mute=1',
                    'tags'     : 'trippy-slow trippy-3D'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/TdU2Ab7y91w?mute=1',
                    'tags'     : 'trippy-slow trippy-3D'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/fFyC68CIEio?mute=1',
                    'tags'     : 'trippy-slow trippy-2D'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/LhZMr3jH7kI?mute=1',
                    'tags'     : 'trippy-fast trippy-3D'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/iaVmsp7dU1Y?mute=1',
                    'tags'     : 'trippy-fast trippy-3D'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/beW6KCQ90Qc?mute=1',
                    'tags'     : 'trippy-fast trippy-3D'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/z3ul9PkRvfY?mute=1',
                    'tags'     : 'trippy-fast trippy-2D'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/vmGDO0eU1n0?mute=1',
                    'tags'     : 'meditative'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/5_Blq9W9cT8?mute=1',
                    'tags'     : 'meditative'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/XHprvRGY2aA?mute=1',
                    'tags'     : 'meditative'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/rY4O88vcTVg?mute=1',
                    'tags'     : 'meditative nature'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/tI2ucenn6hM?mute=1',
                    'tags'     : 'meditative nature'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/l6U2qXfdk6I?mute=1',
                    'tags'     : 'meditative space'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/B5unCXpegAw?mute=1',
                    'tags'     : 'meditative space'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/IWVJq-4zW24?mute=1',
                    'tags'     : 'meditative space'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/CrgYEbIQkac?mute=1',
                    'tags'     : 'meditative space'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/jNyvfvDFFPk?mute=1',
                    'tags'     : 'meditative space'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/zowLNSKyfI0?mute=1',
                    'tags'     : 'leftovers'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/Q-iZMkvHnFw?mute=1',
                    'tags'     : 'leftovers'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/5drq3OD19NQ?mute=1',
                    'tags'     : 'leftovers'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/RpHnKaxt_OQ?mute=1',
                    'tags'     : 'leftovers'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/t_S_cN2re4g?mute=1',
                    'tags'     : 'nature'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/683p4Ubg2NU?mute=1',
                    'tags'     : 'nature'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/AKeUssuu3Is?mute=1',
                    'tags'     : 'nature'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/hld4uaO1MDE?mute=1',
                    'tags'     : 'nature hiking'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/PyFN_FYwqvc?mute=1',
                    'tags'     : 'nature hiking'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/hF-F559PTUg?mute=1',
                    'tags'     : 'nature hiking'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/kSVqPAN1nCM?mute=1',
                    'tags'     : 'nature hiking'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/RDiK058GjgI?mute=1',
                    'tags'     : 'nature hiking'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/U1j-eO3-aR8?mute=1',
                    'tags'     : 'nature hiking'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/e04zAMupq7E?mute=1',
                    'tags'     : 'nature hiking'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/RHycI27FelE?mute=1',
                    'tags'     : 'nature hiking'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/b4AVn8mTuJw?mute=1',
                    'tags'     : 'nature hiking'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/123Z5KLLiO8?mute=1',
                    'tags'     : 'festival'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/8eYEW4q42y8?mute=1',
                    'tags'     : 'festival'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/G59Tm7KqEnY?mute=1',
                    'tags'     : 'festival'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/mmA5fekq8yQ?mute=1',
                    'tags'     : 'festival'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/azfTB6oXhis?mute=1',
                    'tags'     : 'festival'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/R4LKjRJUGkk?mute=1',
                    'tags'     : 'festival'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/R1CyKwtCDr8?mute=1',
                    'tags'     : 'festival'
                },
                {
                    'videoLink': 'https://www.youtube.com/embed/KtXphUrwQtA?mute=1',
                    'tags'     : 'festival'
                },*/
        {
            'videoLink': 'https://www.youtube.com/embed/Am5DwwpKSRA?mute=1',
            'tags'     : 'slideshow',
            'label'    : 'TEST'
        },
        {
            'videoLink': 'https://www.youtube.com/embed/5I69DCxYbBg?mute=1',
            'tags'     : 'slideshow'
        },
        {
            'videoLink': 'https://www.youtube.com/embed/rgZfmWXTqas?mute=1',
            'tags'     : 'slideshow'
        },
        {
            'videoLink': 'https://www.youtube.com/embed/videoseries?list=PLcrVuDwOKu1dfA01A27l6nmwuAaeVQ4h_',
            'tags'     : 'wisdom',
            'label'    : 'Alan Watts Wisdom'
        },
        {
            'videoLink': 'https://www.youtube.com/embed/qUavbO3Y3gY?mute=1',
            'tags'     : 'leftovers'
        },
        {
            'videoLink': 'https://www.youtube.com/embed/s3Tp8ESiiM4?mute=1',
            'tags'     : 'leftovers'
        },
        {
            'videoLink': 'https://www.youtube.com/embed/N0rHxXC27BA?mute=1',
            'tags'     : 'leftovers'
        },
        {
            'videoLink': 'https://www.youtube.com/embed/T7Th3AFs7fw?mute=1',
            'tags'     : 'leftovers'
        },
        {
            'videoLink': 'https://www.youtube.com/embed/JloTUIpOlJk?mute=1',
            'tags'     : 'leftovers'
        },
        {
            'videoLink': 'https://www.youtube.com/embed/VBvVBFZMhKI?mute=1',
            'tags'     : 'trippy-3D'
        },
        {
            'videoLink': 'https://www.youtube.com/embed/qFI4vnMd9X8?mute=1',
            'tags'     : 'leftovers'
        }


    ],
    'images'        : [
        {'image': './media/images/40.jpg'},
        {'image': './media/images/46.jpg'},
        {'image': './media/images/13.jpg'},
        {'image': './media/images/14.jpg'},
        {'image': './media/images/15.jpg'},
        {'image': './media/images/17.jpg'},
        {'image': './media/images/21.jpg'},
        {'image': './media/images/23.jpg'},
        {'image': './media/images/22.jpg'},
        {'image': './media/images/26.jpg'},
        {'image': './media/images/28.jpg'},
        {'image': './media/images/30.jpg'},
        {'image': './media/images/31.jpg'},
        {'image': './media/images/32.jpg'},
        {'image': './media/images/33.jpg'},
        {'image': './media/images/35.jpg'},
        {'image': './media/images/36.jpg'},
        {'image': './media/images/37.jpg'},
        {'image': './media/images/38.jpg'},
        {'image': './media/images/39.jpg'},
        {'image': './media/images/34.jpg'},
        {'image': './media/images/44.jpg'},
        {'image': './media/images/1.png'},
        {'image': './media/images/2.png'},
        {'image': './media/images/3.png'},
        {'image': './media/images/4.png'},
        {'image': './media/images/5.png'},
        {'image': './media/images/6.png'},
        {'image': './media/images/7.png'},
        {'image': './media/images/8.png'},
        {'image': './media/images/9.jpg'},
        {'image': './media/images/10.jpg'},
        {'image': './media/images/11.jpg'},
        {'image': './media/images/12.png'},
        {'image': './media/images/18.png'},
        {'image': './media/images/19.png'}

    ]
};