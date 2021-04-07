import csv
import logging.config
import os
import pathlib
import random
import uuid
from datetime import datetime
from typing import Any, Callable, Dict, List, Tuple

from flask import Flask, jsonify, request
from flask_cors import CORS


if not os.path.exists('./data'):
    os.makedirs('./data')


logging.config.dictConfig({
    'version': 1,
    'formatters': {
        'default': {
            'format': '[%(asctime)s] %(levelname)s: %(message)s',
        }
    },
    'handlers': {
        'wsgi': {
            'class': 'logging.StreamHandler',
            'stream': 'ext://flask.logging.wsgi_errors_stream',
            'formatter': 'default'
        },
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'formatter': 'default',
            'filename': './data/app.log',
            'maxBytes': 10000,
            'backupCount': 100,
        },
    },
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi', 'file']
    }
})

app = Flask(__name__)
CORS(app)


class FileDB:
    def __init__(self, datapath: str, factories: Tuple[Callable[[str], Any], ...]) -> None:
        self._datapath = datapath
        self._factories = factories
        self._create_if_not_exists()

    def _create_if_not_exists(self) -> None:
        if os.path.exists(self._datapath):
            return
        dirpath = os.path.abspath(os.path.dirname(self._datapath))
        if not os.path.exists(dirpath):
            os.makedirs(dirpath)
        pathlib.Path(self._datapath).touch(exist_ok=True)

    def records(self) -> List[Tuple[Any, ...]]:
        rows = []
        with open(self._datapath, 'r', encoding='utf-8') as fp:
            csv_reader = csv.reader(fp, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
            rows = list(csv_reader)

        results = []
        for row in rows:
            results.append(tuple(f(x) for f, x in zip(self._factories, row)))
        return results

    def insert(self, record: Tuple[Any, ...]) -> None:
        assert len(record) == len(self._factories)
        with open(self._datapath, 'a', encoding='utf-8', newline='') as fp:
            writer = csv.writer(fp, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
            writer.writerow(record)


class DB:
    # 0:session_id, 1:gender, 2:age, 3:fingerprint, 4:duplicate, 5:exp1_group, 6:exp2_group, 7:exp3_group
    reg = FileDB('./data/registration.csv', (str, str, int, str, bool, int, int, int, datetime.fromisoformat))
    # session_id, group, estimation
    exp1 = FileDB('./data/exp1.csv', (str, int, float))
    # session_id, group, estimation
    exp2 = FileDB('./data/exp2.csv', (str, int, float))
    # session_id, group, estimation
    exp3 = FileDB('./data/exp3.csv', (str, int, float))


def assign_group(counts: Dict[int, int]):
    min_count = min(counts.values())
    choices = []
    for group, count in counts.items():
        if count == min_count:
            choices.append(group)
    return random.choice(choices)


@app.route('/api/register', methods=['POST'])
def register():
    # parse request
    gender = str(request.json['gender'])
    age = int(request.json['age'])
    fingerprint = str(request.json['fingerprint'])

    # check duplicate fingerprint
    # and existing group allocation
    duplicate = False
    exp1_groups = {0: 0, 1: 0, 2: 0}
    exp2_groups = {0: 0, 1: 0}
    exp3_groups = {0: 0, 1: 0}
    for record in DB.reg.records():
        if record[3] == fingerprint:
            duplicate = True
        exp1_groups[record[5]] += 1
        exp2_groups[record[6]] += 1
        exp3_groups[record[7]] += 1

    # allocate group
    exp1_group = assign_group(exp1_groups)
    exp2_group = assign_group(exp2_groups)
    exp3_group = assign_group(exp3_groups)

    # insert new record
    session_id = str(uuid.uuid4())
    DB.reg.insert((
        session_id,
        gender, age,
        fingerprint, duplicate,
        exp1_group, exp2_group, exp3_group,
        str(datetime.now())))

    # response
    return jsonify({
        "session_id": session_id,
        "duplicate": duplicate,
        "group1": exp1_group,
        "group2": exp2_group,
        "group3": exp3_group,
    })


@app.route('/api/exp1/result', methods=['POST'])
def exp1():
    # parse request
    session_id = str(request.json['session_id'])
    estimation = float(request.json['estimation'])

    # check session id exists
    group = -1
    for record in DB.reg.records():
        if session_id == record[0]:
            group = record[5]
            break
    else:
        return jsonify({'message': 'session_id not found'}), 404

    # insert record
    DB.exp1.insert((session_id, group, estimation))
    return jsonify({'message': 'record saved'})


@app.route('/api/exp2/result', methods=['POST'])
def exp2():
    # parse request
    session_id = str(request.json['session_id'])
    estimation = float(request.json['estimation'])

    # check session id exists
    group = -1
    for record in DB.reg.records():
        if session_id == record[0]:
            group = record[6]
            break
    else:
        return jsonify({'message': 'session_id not found'}), 404

    # insert record
    DB.exp2.insert((session_id, group, estimation))
    return jsonify({'message': 'record saved'})


@app.route('/api/exp3/result', methods=['POST'])
def exp3():
    # parse request
    session_id = str(request.json['session_id'])
    estimation = float(request.json['estimation'])

    # check session id exists
    group = -1
    for record in DB.reg.records():
        if session_id == record[0]:
            group = record[7]
            break
    else:
        return jsonify({'message': 'session_id not found'}), 404

    # insert record
    DB.exp3.insert((session_id, group, estimation))
    return jsonify({'message': 'record saved'})


@app.before_request
def log_request_info():
    app.logger.info('Request headers: [%s]', ', '.join([str(h) for h in request.headers]))
    app.logger.info('Request body: %s', request.get_data())


@app.after_request
def log_response_info(response):
    app.logger.info('Response: %s', response.get_data())
    return response


if __name__ == '__main__':
    app.run()
