export function fakeRequest<T>(data: T): Promise<{
  data: T
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: data
      })
    }, 1000)
  })
}

export const FAKE_SEARCH = {
  code: 200,
  message: '请求成功',
  data: {
    results: [
      {
        id: '1380',
        title: '关于我转生变成史莱姆这档事第二季',
        cover:
          'http://tvax4.sinaimg.cn/large/006sgDP3gy1grb0r7ylf8j607i0alwf602.jpg',
        season: '24集完结',
        category: ['冒险', '奇幻', '战斗'],
        description: '关于我转生变成史莱姆这档事第二季',
        date: '2020年'
      },
      {
        id: '1191',
        title: '打了300年的史莱姆 不知不觉就练到了等级MAX',
        cover:
          'https://pic.rmb.bdstatic.com/bjh/699d7a3108e7ebb86890cc6828a23924.jpeg',
        season: '12集完结',
        category: ['冒险', '奇幻', '搞笑'],
        description: '打了300年的史莱姆 不知不觉就练到了等级MAX',
        date: '2021年'
      },
      {
        id: '1828',
        title: '转生史莱姆日记',
        cover:
          'https://ae04.alicdn.com/kf/Hc1f450500e664cf6acca4b230bb0f3d6J.jpg',
        season: '12集完结',
        category: ['奇幻', '搞笑'],
        description: '转生史莱姆日记',
        date: '2021年'
      },
      {
        id: '1294',
        title: '关于我转生变成史莱姆这档事OAD',
        cover:
          'https://ae04.alicdn.com/kf/H889e2a90bdec481ca1ae877ece17575fT.jpg',
        season: 'OAD5',
        category: ['冒险', '奇幻', '搞笑'],
        description: '关于我转生变成史莱姆这档事OAD',
        date: '2019年'
      },
      {
        id: '29',
        title: '关于我转生变成史莱姆这档事',
        cover:
          'http://tvax4.sinaimg.cn/mw690/0076NW5Ngy1fvs0qgqjkpj306p09hq43.jpg',
        season: '24.5集完结',
        category: ['冒险', '奇幻', '战斗'],
        description: '关于我转生变成史莱姆这档事',
        date: '2018年'
      }
    ],
    pagetotal: 1,
    pageindex: 0
  }
}

export const FAKE_Filter = {
  code: 200,
  message: '\u8bf7\u6c42\u6210\u529f',
  data: {
    results: [
      {
        id: '2165',
        title: '\u52c7\u8005\u8f9e\u804c\u4e0d\u5e72\u4e86',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1gzjaityajcj307409w3z7.jpg',
        season: '\u8fde\u8f7d10\u96c6'
      },
      {
        id: '2143',
        title:
          '\u4e66\u866b\u7684\u4e0b\u514b\u4e0a\uff5e\u4e3a\u4e86\u6210\u4e3a\u56fe\u4e66\u7ba1\u7406\u5458\u800c\u4e0d\u62e9\u624b\u6bb5\uff5e\u7b2c\u4e09\u5b63',
        cover:
          'http://tvax4.sinaimg.cn/large/006sgDEegy1h02k5nbl77j307i0a4abf.jpg',
        season: '\u8fde\u8f7d9\u96c6'
      },
      {
        id: '2162',
        title: '\u8fd9\u4e2a\u533b\u5e08\u8d85\u9ebb\u70e6',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1gzycoeufj2j307409wwf2.jpg',
        season: '\u8fde\u8f7d9\u96c6'
      },
      {
        id: '2158',
        title:
          '\u4e59\u5973\u6e38\u620f\u4e16\u754c\u5bf9\u8def\u4eba\u89d2\u8272\u5f88\u4e0d\u53cb\u597d',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1h0bmead78jj307409w750.jpg',
        season: '\u8fde\u8f7d10\u96c6'
      },
      {
        id: '7',
        title: '\u6d77\u8d3c\u738b',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1grtffkpk03j604605s0t802.jpg',
        season: '\u8fde\u8f7d1020'
      },
      {
        id: '2177',
        title: '\u9b54\u6cd5\u4f7f\u9ece\u660e\u671f',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1gzq98efskuj307409wjs3.jpg',
        season: '\u8fde\u8f7d8\u96c6'
      },
      {
        id: '2176',
        title:
          '\u9ab8\u9aa8\u9a91\u58eb\u5927\u4eba\u5f02\u4e16\u754c\u5192\u9669\u4e2d',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1gymw5m1tzmj307409wq3o.jpg',
        season: '\u8fde\u8f7d9\u96c6'
      },
      {
        id: '2140',
        title: 'Estab Life',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1h0f5d9383kj307409wgmf.jpg',
        season: '12\u96c6\u5b8c\u7ed3'
      },
      {
        id: '2169',
        title: 'RPG\u4e0d\u52a8\u4ea7',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1gzt0fw1sdxj307409wt9c.jpg',
        season: '\u8fde\u8f7d9\u96c6'
      },
      {
        id: '2172',
        title: '\u76fe\u4e4b\u52c7\u8005\u6210\u540d\u5f55\u7b2c\u4e8c\u5b63',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1h0o8mza4ldj307409w74s.jpg',
        season: '\u8fde\u8f7d9\u96c6'
      },
      {
        id: '2173',
        title:
          '\u53f2\u4e0a\u6700\u5f3a\u5927\u9b54\u738b\u8f6c\u751f\u4e3a\u6751\u6c11A',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1gxg9uir71xj307409wmxg.jpg',
        season: '\u8fde\u8f7d9\u96c6'
      },
      {
        id: '1697',
        title:
          '\u52c7\u8005\u6597\u6076\u9f99\uff1a\u8fbe\u5c14\u7684\u5927\u5192\u9669',
        cover:
          'http://tvax4.sinaimg.cn/large/006sgEiggy1gjbidjkuf9j307i0a0q4l.jpg',
        season: '\u8fde\u8f7d80\u96c6'
      },
      {
        id: '6',
        title: '\u535a\u4eba\u4f20 \u706b\u5f71\u5fcd\u8005\u65b0\u65f6\u4ee3',
        cover:
          'http://tvax4.sinaimg.cn/mw690/0076NW5Ngy1ge40lzhulfj307i0bdabr.jpg',
        season: '\u8fde\u8f7d249\u96c6'
      },
      {
        id: '1876',
        title: '\u901a\u7075\u738b',
        cover:
          'http://tvax4.sinaimg.cn/large/006sgDEegy1gobvo9qy3fj307i0aignq.jpg',
        season: '52\u96c6\u5168'
      },
      {
        id: '2135',
        title: '\u8d85\u9f99\u73e0\u82f1\u96c4UGM',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1h028alwebaj307409wq3s.jpg',
        season: '\u8fde\u8f7d2\u96c6'
      },
      {
        id: '1812',
        title: '\u54e5\u5e03\u6797\u6740\u624b\u7b2c\u4e8c\u5b63',
        cover:
          'https://pic.rmb.bdstatic.com/bjh/e1a106d0df0a67d765a4a3ba1c325a9d.jpeg',
        season: 'PV'
      },
      {
        id: '1347',
        title: '\u6765\u81ea\u6df1\u6e0a\u7b2c\u4e8c\u5b63',
        cover: 'https://inews.gtimg.com/newsapp_ls/0/11881736853/0',
        season: 'PV'
      }
    ],
    total_page: 1,
    page: '1',
    total: 17
  }
}

export const FAKE_GETANIME = {
  code: 200,
  message: '\u8bf7\u6c42\u6210\u529f',
  data: {
    title: '\u52c7\u8005\u8f9e\u804c\u4e0d\u5e72\u4e86(2022)',
    cover:
      'https://tvax3.sinaimg.cn/large/008kBpBlgy1gzjaityajcj307409w3z7.jpg',
    rank: '9.2',
    master: '\u4fe1\u7530\u7950',
    actors: [
      '\u5c0f\u91ce\u8d24\u7ae0',
      '\u672c\u6e21\u67ab',
      '\u4f0a\u85e4\u9759',
      '\u5927\u548c\u7530\u4ec1\u7f8e'
    ],
    region: '\u65e5\u672c',
    lang: '\u65e5\u8bed',
    first_date: '2022\u5e74',
    season: '\u8fde\u8f7d10\u96c6',
    categories: ['\u5192\u9669', '\u5947\u5e7b'],
    playlist: {
      '0': [
        { link: '/play/2165-1-1.html', title: '\u7b2c01\u96c6' },
        { link: '/play/2165-1-2.html', title: '\u7b2c02\u96c6' },
        { link: '/play/2165-1-3.html', title: '\u7b2c03\u96c6' },
        { link: '/play/2165-1-4.html', title: '\u7b2c04\u96c6' },
        { link: '/play/2165-1-5.html', title: '\u7b2c05\u96c6' },
        { link: '/play/2165-1-6.html', title: '\u7b2c06\u96c6' },
        { link: '/play/2165-1-7.html', title: '\u7b2c07\u96c6' },
        { link: '/play/2165-1-8.html', title: '\u7b2c08\u96c6' },
        { link: '/play/2165-1-9.html', title: '\u7b2c09\u96c6' },
        { link: '/play/2165-1-10.html', title: '\u7b2c10\u96c6' }
      ],
      '1': [
        { link: '/play/2165-2-1.html', title: '\u7b2c01\u96c6' },
        { link: '/play/2165-2-2.html', title: '\u7b2c02\u96c6' },
        { link: '/play/2165-2-3.html', title: '\u7b2c03\u96c6' },
        { link: '/play/2165-2-4.html', title: '\u7b2c04\u96c6' },
        { link: '/play/2165-2-5.html', title: '\u7b2c05\u96c6' },
        { link: '/play/2165-2-6.html', title: '\u7b2c06\u96c6' },
        { link: '/play/2165-2-7.html', title: '\u7b2c07\u96c6' },
        { link: '/play/2165-2-8.html', title: '\u7b2c08\u96c6' },
        { link: '/play/2165-2-9.html', title: '\u7b2c09\u96c6' },
        { link: '/play/2165-2-10.html', title: '\u7b2c10\u96c6' }
      ]
    }
  }
}

export const FAKE_GETVIDEO = {
  code: 200,
  message: '\u8bf7\u6c42\u6210\u529f',
  data: {
    '0': [
      'https://yun.66dm.net/SBDM/YuushaYamemasu01.m3u8',
      'https://yun.66dm.net/SBDM/YuushaYamemasu02.m3u8',
      'https://yun.66dm.net/SBDM/YuushaYamemasu03.m3u8',
      'https://yun.66dm.net/SBDM/YuushaYamemasu04.m3u8',
      'https://yun.66dm.net/SBDM/YuushaYamemasu05.m3u8',
      'https://yun.66dm.net/SBDM/YuushaYamemasu06.m3u8',
      'https://yun.66dm.net/SBDM/YuushaYamemasu07.m3u8',
      'https://yun.66dm.net/SBDM/YuushaYamemasu08.m3u8',
      'https://yun.66dm.net/SBDM/YuushaYamemasu09.m3u8',
      'https://yun.66dm.net/SBDM/YuushaYamemasu10.m3u8'
    ],
    '1': [
      'https://iqiyi.sd-play.com/20220406/MZRlpUOM/index.m3u8',
      'https://iqiyi.sd-play.com/20220412/EhJwS6BJ/index.m3u8',
      'https://iqiyi.sd-play.com/20220419/m8RsiuuJ/index.m3u8',
      'https://mgtv.sd-play.com/20220426/7luzk9yq/index.m3u8',
      'https://iqiyi.sd-play.com/20220504/0biPDMpw/index.m3u8',
      'https://iqiyi.sd-play.com/20220511/LmjPgJmS/index.m3u8',
      'https://iqiyi.sd-play.com/20220517/94jAw4ZL/index.m3u8',
      'https://iqiyi.sd-play.com/20220524/cVIIxt10/index.m3u8',
      'https://iqiyi.sd-play.com/20220531/9pEJYTDH/index.m3u8',
      "https://iqiyi.sd-play.com/20220608/AIa2zQzE/index.m3u8'"
    ]
  }
}

export const FAKE_GETCONFIG = {
  code: 200,
  message: '请求成功',
  data: {
    filtersConfig: [
      {
        id: 1,
        name: '新番连载',
        categories: [
          {
            classid: '1',
            classname: '冒险'
          },
          {
            classid: '2',
            classname: '热血'
          },
          {
            classid: '3',
            classname: '奇幻'
          },
          {
            classid: '4',
            classname: '恋爱'
          },
          {
            classid: '5',
            classname: '校园'
          },
          {
            classid: '6',
            classname: '后宫'
          },
          {
            classid: '7',
            classname: '搞笑'
          },
          {
            classid: '8',
            classname: '青春'
          },
          {
            classid: '9',
            classname: '百合'
          },
          {
            classid: '14',
            classname: '科幻'
          },
          {
            classid: '13',
            classname: '推理'
          },
          {
            classid: '12',
            classname: '魔法'
          },
          {
            classid: '11',
            classname: '神魔'
          },
          {
            classid: '10',
            classname: '治愈'
          },
          {
            classid: '59',
            classname: '竞技'
          },
          {
            classid: '60',
            classname: '悬疑'
          },
          {
            classid: '62',
            classname: '战争'
          },
          {
            classid: '63',
            classname: '萝莉'
          },
          {
            classid: '64',
            classname: '魔幻'
          },
          {
            classid: '65',
            classname: '战斗'
          },
          {
            classid: '98',
            classname: '歌舞'
          },
          {
            classid: '99',
            classname: '历史'
          },
          {
            classid: '108',
            classname: '励志'
          },
          {
            classid: '118',
            classname: '偶像'
          },
          {
            classid: '121',
            classname: '职场'
          }
        ]
      },
      {
        id: 3,
        name: '完结日漫',
        categories: [
          {
            classid: '36',
            classname: '冒险'
          },
          {
            classid: '37',
            classname: '热血'
          },
          {
            classid: '38',
            classname: '奇幻'
          },
          {
            classid: '39',
            classname: '恋爱'
          },
          {
            classid: '40',
            classname: '校园'
          },
          {
            classid: '41',
            classname: '后宫'
          },
          {
            classid: '42',
            classname: '搞笑'
          },
          {
            classid: '43',
            classname: '治愈'
          },
          {
            classid: '44',
            classname: '神魔'
          },
          {
            classid: '45',
            classname: '魔法'
          },
          {
            classid: '46',
            classname: '百合'
          },
          {
            classid: '47',
            classname: '推理'
          },
          {
            classid: '48',
            classname: '科幻'
          },
          {
            classid: '49',
            classname: '竞技'
          },
          {
            classid: '66',
            classname: '悬疑'
          },
          {
            classid: '68',
            classname: '战争'
          },
          {
            classid: '69',
            classname: '萝莉'
          },
          {
            classid: '70',
            classname: '魔幻'
          },
          {
            classid: '71',
            classname: '战斗'
          },
          {
            classid: '72',
            classname: '青春'
          },
          {
            classid: '100',
            classname: '历史'
          },
          {
            classid: '101',
            classname: '歌舞'
          },
          {
            classid: '104',
            classname: '恐怖'
          },
          {
            classid: '107',
            classname: '职场'
          },
          {
            classid: '109',
            classname: '励志'
          },
          {
            classid: '119',
            classname: '偶像'
          }
        ]
      },
      {
        id: 4,
        name: '热门国漫',
        categories: [
          {
            classid: '50',
            classname: '冒险'
          },
          {
            classid: '51',
            classname: '热血'
          },
          {
            classid: '52',
            classname: '武侠'
          },
          {
            classid: '53',
            classname: '奇幻'
          },
          {
            classid: '54',
            classname: '玄幻'
          },
          {
            classid: '55',
            classname: '竞技'
          },
          {
            classid: '56',
            classname: '魔幻'
          },
          {
            classid: '57',
            classname: '科幻'
          },
          {
            classid: '58',
            classname: '恋爱'
          },
          {
            classid: '73',
            classname: '历史'
          },
          {
            classid: '74',
            classname: '战斗'
          },
          {
            classid: '75',
            classname: '搞笑'
          },
          {
            classid: '76',
            classname: '神魔'
          },
          {
            classid: '97',
            classname: '战争'
          },
          {
            classid: '111',
            classname: '古装'
          },
          {
            classid: '112',
            classname: '少女'
          },
          {
            classid: '113',
            classname: '萝莉'
          },
          {
            classid: '114',
            classname: '治愈'
          },
          {
            classid: '115',
            classname: '日常'
          },
          {
            classid: '116',
            classname: '歌舞'
          },
          {
            classid: '120',
            classname: '偶像'
          },
          {
            classid: '123',
            classname: '职场'
          },
          {
            classid: '125',
            classname: '仙侠'
          }
        ]
      },
      {
        id: 16,
        name: '剧场动漫',
        categories: [
          {
            classid: '77',
            classname: '冒险'
          },
          {
            classid: '78',
            classname: '热血'
          },
          {
            classid: '79',
            classname: '奇幻'
          },
          {
            classid: '80',
            classname: '恋爱'
          },
          {
            classid: '81',
            classname: '校园'
          },
          {
            classid: '82',
            classname: '后宫'
          },
          {
            classid: '83',
            classname: '搞笑'
          },
          {
            classid: '84',
            classname: '青春'
          },
          {
            classid: '85',
            classname: '百合'
          },
          {
            classid: '86',
            classname: '治愈'
          },
          {
            classid: '87',
            classname: '神魔'
          },
          {
            classid: '88',
            classname: '魔法'
          },
          {
            classid: '89',
            classname: '推理'
          },
          {
            classid: '90',
            classname: '科幻'
          },
          {
            classid: '91',
            classname: '竞技'
          },
          {
            classid: '92',
            classname: '悬疑'
          },
          {
            classid: '93',
            classname: '战争'
          },
          {
            classid: '94',
            classname: '萝莉'
          },
          {
            classid: '95',
            classname: '魔幻'
          },
          {
            classid: '96',
            classname: '战斗'
          },
          {
            classid: '102',
            classname: '历史'
          },
          {
            classid: '103',
            classname: '歌舞'
          },
          {
            classid: '105',
            classname: '恐怖'
          },
          {
            classid: '106',
            classname: '职场'
          },
          {
            classid: '110',
            classname: '励志'
          },
          {
            classid: '117',
            classname: '偶像'
          },
          {
            classid: '124',
            classname: '职场'
          }
        ]
      }
    ]
  }
}

export const FAKE_GETINDEX = {
  code: 200,
  message: '\u8bf7\u6c42\u6210\u529f',
  data: {
    hots: {
      results: [
        {
          id: '2156',
          title: '\u95f4\u8c0d\u8fc7\u5bb6\u5bb6',
          cover:
            'http://tvax4.sinaimg.cn/large/006yt1Omgy1h00m6xnjc7j31jk26i4qp.jpg',
          season: '\u8fde\u8f7d9\u96c6',
          description: null,
          date: null
        },
        {
          id: '2165',
          title: '\u52c7\u8005\u8f9e\u804c\u4e0d\u5e72\u4e86',
          cover:
            'https://tvax3.sinaimg.cn/large/008kBpBlgy1gzjaityajcj307409w3z7.jpg',
          season: '\u8fde\u8f7d10\u96c6',
          description: null,
          date: null
        },
        {
          id: '2158',
          title:
            '\u4e59\u5973\u6e38\u620f\u4e16\u754c\u5bf9\u8def\u4eba\u89d2\u8272\u5f88\u4e0d\u53cb\u597d',
          cover:
            'https://tvax3.sinaimg.cn/large/008kBpBlgy1h0bmead78jj307409w750.jpg',
          season: '\u8fde\u8f7d10\u96c6',
          description: null,
          date: null
        },
        {
          id: '7',
          title: '\u6d77\u8d3c\u738b',
          cover:
            'https://tvax3.sinaimg.cn/large/008kBpBlgy1grtffkpk03j604605s0t802.jpg',
          season: '\u8fde\u8f7d1020',
          description: null,
          date: null
        },
        {
          id: '2166',
          title: '\u670b\u53cb\u6e38\u620f',
          cover:
            'https://tvax3.sinaimg.cn/large/008kBpBlgy1h0j1wnotw9j307409wt99.jpg',
          season: '\u8fde\u8f7d10\u96c6',
          description: null,
          date: null
        },
        {
          id: '2176',
          title:
            '\u9ab8\u9aa8\u9a91\u58eb\u5927\u4eba\u5f02\u4e16\u754c\u5192\u9669\u4e2d',
          cover:
            'https://tvax3.sinaimg.cn/large/008kBpBlgy1gymw5m1tzmj307409wq3o.jpg',
          season: '\u8fde\u8f7d9\u96c6',
          description: null,
          date: null
        },
        {
          id: '2172',
          title: '\u76fe\u4e4b\u52c7\u8005\u6210\u540d\u5f55\u7b2c\u4e8c\u5b63',
          cover:
            'https://tvax3.sinaimg.cn/large/008kBpBlgy1h0o8mza4ldj307409w74s.jpg',
          season: '\u8fde\u8f7d9\u96c6',
          description: null,
          date: null
        },
        {
          id: '2173',
          title:
            '\u53f2\u4e0a\u6700\u5f3a\u5927\u9b54\u738b\u8f6c\u751f\u4e3a\u6751\u6c11A',
          cover:
            'https://tvax3.sinaimg.cn/large/008kBpBlgy1gxg9uir71xj307409wmxg.jpg',
          season: '\u8fde\u8f7d9\u96c6',
          description: null,
          date: null
        },
        {
          id: '2168',
          title: '3\u79d2\u540e\uff0c\u53d8\u8eab\u6210\u91ce\u517d',
          cover:
            'https://tvax3.sinaimg.cn/large/008kBpBlgy1h0kmjqfnkej307409wjru.jpg',
          season: '\u8fde\u8f7d7\u96c6',
          description: null,
          date: null
        },
        {
          id: '2180',
          title:
            '\u8f89\u591c\u5927\u5c0f\u59d0\u60f3\u8ba9\u6211\u544a\u767d\uff5e\u5929\u624d\u4eec\u7684\u604b\u7231\u5934\u8111\u6218\uff5e \u7b2c\u4e09\u5b63',
          cover:
            'https://tvax3.sinaimg.cn/large/008kBpBlgy1gvn5hmhv1oj607409w3z302.jpg',
          season: '\u8fde\u8f7d9\u96c6',
          description: null,
          date: null
        },
        {
          id: '2174',
          title: '\u590f\u65e5\u91cd\u73b0',
          cover:
            'https://tvax3.sinaimg.cn/large/008kBpBlgy1gz33z2fg87j307409wmxp.jpg',
          season: '\u8fde\u8f7d8\u96c6',
          description: null,
          date: null
        },
        {
          id: '2152',
          title: '\u6d3e\u5bf9\u6d6a\u5ba2\u8bf8\u845b\u5b54\u660e',
          cover:
            'https://tvax3.sinaimg.cn/large/008kBpBlgy1gykdm5ul0jj307409waaw.jpg',
          season: '\u8fde\u8f7d10\u96c6',
          description: null,
          date: null
        },
        {
          id: '2154',
          title: '\u9752\u4e4b\u82a6\u82c7',
          cover:
            'https://tvax3.sinaimg.cn/large/008kBpBlgy1gz90lkfbz0j307409wq3q.jpg',
          season: '\u8fde\u8f7d9\u96c6',
          description: null,
          date: null
        },
        {
          id: '2143',
          title:
            '\u4e66\u866b\u7684\u4e0b\u514b\u4e0a\uff5e\u4e3a\u4e86\u6210\u4e3a\u56fe\u4e66\u7ba1\u7406\u5458\u800c\u4e0d\u62e9\u624b\u6bb5\uff5e\u7b2c\u4e09\u5b63',
          cover:
            'http://tvax4.sinaimg.cn/large/006sgDEegy1h02k5nbl77j307i0a4abf.jpg',
          season: '\u8fde\u8f7d9\u96c6',
          description: null,
          date: null
        },
        {
          id: '2170',
          title:
            '\u53e4\u89c1\u540c\u5b66\u6709\u4ea4\u6d41\u969c\u788d\u75c7\u7b2c\u4e8c\u5b63',
          cover:
            'https://tvax3.sinaimg.cn/large/008kBpBlgy1gzuug2szdyj307409wjrw.jpg',
          season: '\u8fde\u8f7d9\u96c6',
          description: null,
          date: null
        },
        {
          id: '2157',
          title: '\u6211\u5bb6\u5973\u53cb\u53ef\u4e0d\u6b62\u53ef\u7231\u5462',
          cover:
            'https://tvax3.sinaimg.cn/large/008kBpBlgy1h0j1yca614j307409wq3d.jpg',
          season: '\u8fde\u8f7d8\u96c6',
          description: null,
          date: null
        }
      ]
    },
    banner: [
      {
        id: '1667',
        title: '\u51e1\u4eba\u4fee\u4ed9\u4f20',
        cover:
          'http://cdn.u1.huluxia.com/g4/M03/BB/81/rBAAdmI_z2CAbJYTAAi5st74DeQ491.jpg'
      },
      {
        id: '934',
        title:
          'Re\uff1a\u4ece\u96f6\u5f00\u59cb\u7684\u5f02\u4e16\u754c\u751f\u6d3b\u7b2c\u4e8c\u5b63',
        cover:
          'http://tvax4.sinaimg.cn/large/006sgDEegy1ggar6ssjh3j307i0a0gmp.jpg'
      },
      {
        id: '619',
        title: '\u9b54\u9053\u7956\u5e08',
        cover:
          'https://p5.toutiaoimg.com/img/tos-cn-i-siecs4i2o7/98f7d0b8b1214c62826d64d328a86d0f~noop.image'
      },
      {
        id: '1315',
        title: '\u9547\u9b42\u8857\u7b2c\u4e8c\u5b63',
        cover:
          'https://p26.toutiaoimg.com/origin/pgc-image/735434f3b10a4a68a140ca93ea45528c'
      },
      {
        id: '208',
        title: '\u8fdb\u51fb\u7684\u5de8\u4eba\u7b2c\u4e00\u5b63',
        cover:
          'https://p26.toutiaoimg.com/origin/web.business.image/202201025d0d5788bbf6ab764ea69f93'
      }
    ],
    perweek: {
      '0': [
        {
          id: '2159',
          title: '\u9ed1\u5ca9\u5c04\u624b DAWN FALL',
          season: '\u8fde\u8f7d10\u96c6'
        },
        {
          id: '2154',
          title: '\u9752\u4e4b\u82a6\u82c7',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '2164',
          title: '\u6b4c\u6108\u5c11\u5973',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '2142',
          title: '\u771f\u00b7\u4e00\u9a91\u5f53\u5343',
          season: '\u5b8c\u7ed3'
        }
      ],
      '1': [
        {
          id: '2165',
          title: '\u52c7\u8005\u8f9e\u804c\u4e0d\u5e72\u4e86',
          season: '\u8fde\u8f7d10\u96c6'
        },
        {
          id: '2184',
          title: '\u5883\u754c\u6218\u673a\u7b2c\u4e8c\u5b63',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '2143',
          title:
            '\u4e66\u866b\u7684\u4e0b\u514b\u4e0a\uff5e\u4e3a\u4e86\u6210\u4e3a\u56fe\u4e66\u7ba1\u7406\u5458\u800c\u4e0d\u62e9\u624b\u6bb5\uff5e\u7b2c\u4e09\u5b63',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '2168',
          title: '3\u79d2\u540e\uff0c\u53d8\u8eab\u6210\u91ce\u517d',
          season: '\u8fde\u8f7d7\u96c6'
        },
        {
          id: '2135',
          title: '\u8d85\u9f99\u73e0\u82f1\u96c4UGM',
          season: '\u8fde\u8f7d2\u96c6'
        }
      ],
      '2': [
        {
          id: '2166',
          title: '\u670b\u53cb\u6e38\u620f',
          season: '\u8fde\u8f7d10\u96c6'
        },
        { id: '2140', title: 'Estab Life', season: '12\u96c6\u5b8c\u7ed3' },
        {
          id: '2169',
          title: 'RPG\u4e0d\u52a8\u4ea7',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '2171',
          title: '\u76f8\u5408\u4e4b\u7269',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '2172',
          title: '\u76fe\u4e4b\u52c7\u8005\u6210\u540d\u5f55\u7b2c\u4e8c\u5b63',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '2173',
          title:
            '\u53f2\u4e0a\u6700\u5f3a\u5927\u9b54\u738b\u8f6c\u751f\u4e3a\u6751\u6c11A',
          season: '\u8fde\u8f7d9\u96c6'
        },
        { id: '2167', title: 'BIRDIE WING', season: '\u8fde\u8f7d9\u96c6' },
        {
          id: '2144',
          title: '\u566c\u8840\u72c2\u88ad \u6700\u7ec8\u5b63',
          season: '\u8fde\u8f7d2\u96c6'
        }
      ],
      '3': [
        {
          id: '2170',
          title:
            '\u53e4\u89c1\u540c\u5b66\u6709\u4ea4\u6d41\u969c\u788d\u75c7\u7b2c\u4e8c\u5b63',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '2179',
          title:
            '\u793e\u755c\u5c0f\u59d0\u60f3\u88ab\u5e7d\u7075\u5e7c\u5973\u6cbb\u6108',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '2152',
          title: '\u6d3e\u5bf9\u6d6a\u5ba2\u8bf8\u845b\u5b54\u660e',
          season: '\u8fde\u8f7d10\u96c6'
        },
        {
          id: '2176',
          title:
            '\u9ab8\u9aa8\u9a91\u58eb\u5927\u4eba\u5f02\u4e16\u754c\u5192\u9669\u4e2d',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '2178',
          title:
            '\u8eab\u4e3a\u5973\u4e3b\u89d2 \u8ba8\u538c\u7684\u5973\u4e3b\u89d2\u4e0e\u79d8\u5bc6\u7684\u5de5\u4f5c',
          season: '\u8fde\u8f7d9\u96c6'
        },
        { id: '2132', title: '\u838e\u6728', season: '13\u96c6\u5b8c\u7ed3' },
        { id: '1876', title: '\u901a\u7075\u738b', season: '52\u96c6\u5168' }
      ],
      '4': [
        {
          id: '2148',
          title: '\u604b\u7231\u8981\u5728\u4e16\u754c\u5f81\u670d\u540e',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '2149',
          title: '\u7ea6\u4f1a\u5927\u4f5c\u6218\u7b2c\u56db\u5b63',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '2177',
          title: '\u9b54\u6cd5\u4f7f\u9ece\u660e\u671f',
          season: '\u8fde\u8f7d8\u96c6'
        },
        {
          id: '2174',
          title: '\u590f\u65e5\u91cd\u73b0',
          season: '\u8fde\u8f7d8\u96c6'
        },
        {
          id: '2185',
          title: '\u9b3c\u88e4\u8869',
          season: '\u8fde\u8f7d8\u96c6'
        }
      ],
      '5': [
        { id: '2153', title: 'Love All Play', season: '\u8fde\u8f7d10\u96c6' },
        {
          id: '2160',
          title:
            'Love Live! \u8679\u54b2\u5b66\u56ed\u6821\u56ed\u5076\u50cf\u540c\u597d\u4f1a \u7b2c\u4e8c\u5b63',
          season: '\u8fde\u8f7d10\u96c6'
        },
        {
          id: '2156',
          title: '\u95f4\u8c0d\u8fc7\u5bb6\u5bb6',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '2150',
          title:
            '\u7406\u79d1\u751f\u5760\u5165\u60c5\u7f51\u6545\u5c1d\u8bd5\u8bc1\u660e\u7b2c\u4e8c\u5b63',
          season: '\u8fde\u8f7d10\u96c6'
        },
        {
          id: '2147',
          title: '\u6d4b\u4e0d\u51c6\u7684\u963f\u6ce2\u8fde\u540c\u5b66',
          season: '\u8fde\u8f7d10\u96c6'
        },
        {
          id: '2181',
          title: '\u821e\u52a8\u4e0d\u6b62',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '2175',
          title: '\u8857\u89d2\u9b54\u65cf\u7b2c\u4e8c\u5b63',
          season: '\u8fde\u8f7d8\u96c6'
        },
        {
          id: '2180',
          title:
            '\u8f89\u591c\u5927\u5c0f\u59d0\u60f3\u8ba9\u6211\u544a\u767d\uff5e\u5929\u624d\u4eec\u7684\u604b\u7231\u5934\u8111\u6218\uff5e \u7b2c\u4e09\u5b63',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '1813',
          title: '\u5904\u5211\u5c11\u5973\u7684\u751f\u5b58\u4e4b\u9053',
          season: '\u8fde\u8f7d10\u96c6'
        },
        {
          id: '1697',
          title:
            '\u52c7\u8005\u6597\u6076\u9f99\uff1a\u8fbe\u5c14\u7684\u5927\u5192\u9669',
          season: '\u8fde\u8f7d80\u96c6'
        }
      ],
      '6': [
        {
          id: '2162',
          title: '\u8fd9\u4e2a\u533b\u5e08\u8d85\u9ebb\u70e6',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '2086',
          title: '\u8537\u8587\u738b\u7684\u846c\u5217',
          season: '\u8fde\u8f7d21\u96c6'
        },
        {
          id: '2158',
          title:
            '\u4e59\u5973\u6e38\u620f\u4e16\u754c\u5bf9\u8def\u4eba\u89d2\u8272\u5f88\u4e0d\u53cb\u597d',
          season: '\u8fde\u8f7d10\u96c6'
        },
        {
          id: '2182',
          title: '\u738b\u8005\u5929\u4e0b\u7b2c\u56db\u5b63',
          season: '\u8fde\u8f7d9\u96c6'
        },
        { id: '7', title: '\u6d77\u8d3c\u738b', season: '\u8fde\u8f7d1020' },
        {
          id: '2163',
          title: '\u7fa4\u9752\u7684\u53f7\u89d2',
          season: '\u8fde\u8f7d10\u96c6'
        },
        {
          id: '2183',
          title: '\u5973\u5fcd\u8005\u693f\u7684\u5fc3\u4e8b',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '2187',
          title: '\u675c\u9e43\u7684\u5a5a\u7ea6',
          season: '\u8fde\u8f7d7\u96c6'
        },
        {
          id: '2155',
          title: 'Build Divide -#FFFFFF-',
          season: '\u8fde\u8f7d9\u96c6'
        },
        {
          id: '2157',
          title: '\u6211\u5bb6\u5973\u53cb\u53ef\u4e0d\u6b62\u53ef\u7231\u5462',
          season: '\u8fde\u8f7d8\u96c6'
        },
        {
          id: '2064',
          title: '\u5047\u9762\u9a91\u58ebRevice',
          season: '\u8fde\u8f7d35\u96c6'
        },
        {
          id: '6',
          title:
            '\u535a\u4eba\u4f20 \u706b\u5f71\u5fcd\u8005\u65b0\u65f6\u4ee3',
          season: '\u8fde\u8f7d249\u96c6'
        }
      ]
    },
    latest: [
      {
        id: '2156',
        title: '\u95f4\u8c0d\u8fc7\u5bb6\u5bb6',
        cover:
          'http://tvax4.sinaimg.cn/large/006yt1Omgy1h00m6xnjc7j31jk26i4qp.jpg',
        season: '\u8fde\u8f7d9\u96c6'
      },
      {
        id: '2165',
        title: '\u52c7\u8005\u8f9e\u804c\u4e0d\u5e72\u4e86',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1gzjaityajcj307409w3z7.jpg',
        season: '\u8fde\u8f7d10\u96c6'
      },
      {
        id: '2158',
        title:
          '\u4e59\u5973\u6e38\u620f\u4e16\u754c\u5bf9\u8def\u4eba\u89d2\u8272\u5f88\u4e0d\u53cb\u597d',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1h0bmead78jj307409w750.jpg',
        season: '\u8fde\u8f7d10\u96c6'
      },
      {
        id: '7',
        title: '\u6d77\u8d3c\u738b',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1grtffkpk03j604605s0t802.jpg',
        season: '\u8fde\u8f7d1020'
      }
    ],
    japancomic: [
      {
        id: '526',
        title: '\u6076\u9b54\u9ad8\u6821DXD\u7b2c\u4e00\u5b63 BD\u65e0\u4fee',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1gsb8qeo910j307409wjst.jpg',
        season: '7\u5377\u5b8c\u7ed3'
      },
      {
        id: '1724',
        title:
          '\u56de\u590d\u672f\u58eb\u7684\u91cd\u6765\u4eba\u751f BD\u65e0\u4fee',
        cover:
          'http://tvax4.sinaimg.cn/large/006sgDEegy1glsc88j2rmj307i0amabq.jpg',
        season: '3\u5dfb\u5b8c\u7ed3'
      },
      {
        id: '1829',
        title: '\u9b3c\u706d\u4e4b\u5203\u7b2c\u4e8c\u5b63',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1gx3e523m8lj307409w0th.jpg',
        season: '11\u96c6\u5b8c\u7ed3'
      },
      {
        id: '1220',
        title: '\u51fa\u5305\u738b\u5973\u7b2c\u4e00\u5b63 BD\u65e0\u4fee',
        cover:
          'http://tvax4.sinaimg.cn/large/006si4WOgy1gfrne6n27cj307i0aodh6.jpg',
        season: '13\u5377\u5b8c\u7ed3'
      }
    ],
    chinese_comic: [
      {
        id: '586',
        title: '\u6597\u7f57\u5927\u9646',
        cover:
          'https://tvax4.sinaimg.cn/mw1024/6486e908gy1g0oj0wqrfgj207i0akgmb.jpg',
        season: '\u8fde\u8f7d211\u96c6'
      },
      {
        id: '1992',
        title: '\u4e5d\u5929\u7384\u5e1d\u8bc0',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1gtiexuu1ujj604605sq2z02.jpg',
        season: '\u8fde\u8f7d51\u96c6'
      },
      {
        id: '2191',
        title: '\u5bfb\u5251',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1h1mxhokibij307409wt97.jpg',
        season: '\u8fde\u8f7d8\u96c6'
      },
      {
        id: '2202',
        title: '\u53f2\u4e0a\u6700\u5f3a\u7537\u4e3b\u89d2',
        cover:
          'http://tvax4.sinaimg.cn/large/006sgDEegy1h2hhoi6oeyj307i0aijsw.jpg',
        season: '\u8fde\u8f7d4\u96c6'
      }
    ],
    theatre_comic: [
      {
        id: '2199',
        title: '\u5492\u672f\u56de\u6218 0',
        cover:
          'https://tvax3.sinaimg.cn/large/008kBpBlgy1gx1wptbyy6j307409wmxu.jpg',
        season: 'BDTC'
      },
      {
        id: '1212',
        title: '\u6388\u8bfe\u5230\u5929\u4eaeChu\uff01BD\u65e0\u4fee',
        cover:
          'https://tvax4.sinaimg.cn/large/006MDjU7gy1g6tqrdtjw4j307i0b9dg8.jpg',
        season: '\u5168\u96c6'
      },
      {
        id: '1770',
        title:
          '\u9b3c\u706d\u4e4b\u5203 \u67f1\u4f17\u4f1a\u8bae\u30fb\u8776\u5c4b\u6577\u7bc7',
        cover:
          'http://tvax4.sinaimg.cn/large/006sgDP3gy1gmcm5nzpyzj30780a6q4c.jpg',
        season: 'BD\u5168\u96c6'
      },
      {
        id: '1184',
        title:
          '\u9b3c\u706d\u4e4b\u5203\u5267\u573a\u7248 \u65e0\u9650\u5217\u8f66\u7bc7',
        cover:
          'http://tvax4.sinaimg.cn/large/006sgDEegy1gldh3zjjm0j307i0alt9e.jpg',
        season: 'BD\u5168\u96c6'
      }
    ]
  }
}
