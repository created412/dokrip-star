# -*- coding: utf-8 -*-
"""독립군의 별 — 한 장짜리 HTML 로 굽는다.

    python src/build.py

src/head.part + src/extra.css + src/skin.css + src/art.js + src/audio.js + src/game.js 를 합치고,
assets/bundle/*.json 에 들어 있는 그림·음원(base64)을 자리표시자에 끼워 넣어
index.html 하나를 만든다. 외부 파일 없이 그 한 장만으로 돌아간다.

자리표시자
    __F_*__      소대원·실존 인물 얼굴      assets/bundle/faces.json
    __SC<n>__    장면 그림 / 선택지 그림    assets/bundle/scenes.json
    __SCTITLE__  타이틀 키아트              assets/bundle/scenes.json['title']
    __SP_*__     무대 위 인물 스프라이트    assets/bundle/sprites.json
    __BGM_*__    배경음 다섯 곡            assets/bundle/bgm.json
    __CAMP_*__   주둔지 배경 (낮/밤)        assets/img/camp_day.jpg, camp_night.jpg
    __CSP_META__ 인라인 스크립트 해시를 넣은 CSP

같이 굽는 것
    _headers     Cloudflare Pages·Netlify 형식의 보안 응답 헤더
    src/check.js 거대한 base64 없이 node --check 로 문법만 볼 수 있는 사본
"""

import base64
import hashlib
import io
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src')
BUNDLE = os.path.join(ROOT, 'assets', 'bundle')
IMG = os.path.join(ROOT, 'assets', 'img')
OUT = os.path.join(ROOT, 'index.html')
HEADERS_OUT = os.path.join(ROOT, '_headers')


def read(path):
    return io.open(path, encoding='utf-8').read()


def data_uri(path):
    return 'data:image/jpeg;base64,' + base64.b64encode(open(path, 'rb').read()).decode()


def main():
    head = read(os.path.join(SRC, 'head.part'))
    css = read(os.path.join(SRC, 'extra.css')) + chr(10) + read(os.path.join(SRC, 'skin.css'))
    js = read(os.path.join(SRC, 'game.js'))
    js = js.replace('/* @@ART@@ */', read(os.path.join(SRC, 'art.js')))
    js = js.replace('/* @@AUDIO@@ */', read(os.path.join(SRC, 'audio.js')))
    head = head.replace('</style>', css + chr(10) + '</style>')

    faces = json.load(open(os.path.join(BUNDLE, 'faces.json')))
    scenes = json.load(open(os.path.join(BUNDLE, 'scenes.json')))
    bgm = json.load(open(os.path.join(BUNDLE, 'bgm.json')))
    sprites = json.load(open(os.path.join(BUNDLE, 'sprites.json')))
    camp = {k: data_uri(os.path.join(IMG, 'camp_%s.jpg' % k)) for k in ('day', 'night')}

    used = set(int(n) for n in re.findall(r'__SC(\d+)__', js))
    have = set(int(k) for k in scenes if k.isdigit())
    missing = sorted(used - have)
    if missing:
        sys.exit('scenes.json 에 없는 장면 번호: %s' % missing)
    unused = sorted(have - used)
    if unused:
        sys.stdout.write('안 쓰는 장면(빌드에서 제외): %s\n' % unused)

    # 문법 검사용 사본 — 거대한 base64 없이 node --check 로 돌려 볼 수 있다
    check = js.replace('__SCTITLE__', 'data:,')
    for k in sprites:
        check = check.replace('__SP_' + k.upper() + '__', 'data:,')
    for k in faces:
        check = check.replace('__F_' + k.upper() + '__', 'data:,')
    for n in used:
        check = check.replace('__SC%d__' % n, 'data:,')
    for k in bgm:
        check = check.replace('__BGM_' + k.upper() + '__', 'data:,')
    for k in camp:
        check = check.replace('__CAMP_' + k.upper() + '__', 'data:,')
    io.open(os.path.join(SRC, 'check.js'), 'w', encoding='utf-8', newline=chr(10)).write(check)

    js = js.replace('__SCTITLE__', scenes['title'])
    for k in sprites:
        js = js.replace('__SP_' + k.upper() + '__', sprites[k])
    for k in faces:
        js = js.replace('__F_' + k.upper() + '__', faces[k])
    for n in used:
        js = js.replace('__SC%d__' % n, scenes[str(n)])
    for k in bgm:
        js = js.replace('__BGM_' + k.upper() + '__', bgm[k])
    for k in camp:
        js = js.replace('__CAMP_' + k.upper() + '__', camp[k])
    for token in ('__F_', '__SC', '__BGM_', '__CAMP_', '__SP_'):
        if token in js:
            sys.exit('채우지 못한 자리표시자가 남았다: %s' % token)

    # 인라인 스크립트의 SHA-256 을 CSP 에 박는다.
    # 'unsafe-inline' 없이도 이 스크립트 하나만 실행이 허용된다.
    body = chr(10) + js + chr(10)
    digest = base64.b64encode(hashlib.sha256(body.encode('utf-8')).digest()).decode()
    csp = (
        "default-src 'self'; "
        "script-src 'self' 'sha256-%s'; "
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
        "font-src 'self' https://fonts.gstatic.com; "
        "img-src 'self' data:; media-src 'self' data:; connect-src 'self'; "
        "object-src 'none'; base-uri 'self'; form-action 'self'" % digest
    )
    head = head.replace('__CSP_META__', csp)
    if '__CSP_META__' in head:
        sys.exit('CSP 자리표시자를 채우지 못했다')

    out = head + '<script>' + body + '</script>' + chr(10) + '</body>' + chr(10) + '</html>' + chr(10)
    io.open(OUT, 'w', encoding='utf-8', newline=chr(10)).write(out)

    # frame-ancestors 는 meta 에서 무시되므로 응답 헤더에만 넣는다
    headers = chr(10).join([
        '/*',
        '  Content-Security-Policy: ' + csp + "; frame-ancestors 'none'",
        '  X-Frame-Options: DENY',
        '  X-Content-Type-Options: nosniff',
        '  Referrer-Policy: strict-origin-when-cross-origin',
        '  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()',
        '  Strict-Transport-Security: max-age=31536000; includeSubDomains',
        '',
    ])
    io.open(HEADERS_OUT, 'w', encoding='utf-8', newline=chr(10)).write(headers)

    sys.stdout.write('built %s  (%.2f MB)\n' % (os.path.basename(OUT),
                                                len(out.encode('utf-8')) / 1048576.0))


if __name__ == '__main__':
    main()
