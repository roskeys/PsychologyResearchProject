from typing import Any, Dict, Optional

import matplotlib.pyplot as plt
import seaborn as sns

from backend.main import DB


def plot_age(ages: Dict[str, Any], title: Optional[str] = None):
    fig, (ax_m, ax_f) = plt.subplots(1, 2, sharey=True)
    fig.subplots_adjust(wspace=.001)

    ax_m.invert_xaxis()
    ax_m.set_xticks(range(0, 100, 2))
    ax_m.set_yticks(range(0, 100, 2))
    sns.histplot(y=ages['Male'], binwidth=2, ax=ax_m, color=sns.color_palette()[0])
    ax_m.set_xlabel('Male')
    ax_m.set_ylabel('Age')

    ax_f.set_xticks(range(0, 100, 2))
    ax_f.set_yticks(range(0, 100, 2))
    sns.histplot(y=ages['Female'], binwidth=2, ax=ax_f, color=sns.color_palette()[1])
    ax_f.set_xlabel('Female')

    if title:
        fig.suptitle(title)
    return fig


def plot_distribution(data: Dict[Any, Any], title: Optional[str] = None):
    fig, axes = plt.subplots(
        1 + len(data),
        sharex=True,
        gridspec_kw={
            "height_ratios": [0.2/(len(data))] * len(data) + [0.8]
        })
    sns.despine(ax=axes[-1])
    axes[-1].set(xlim=(0, 1.0))
    for i, value in enumerate(data.values()):
        axes[i].set_axis_off()
        sns.boxplot(
            data=value, orient='h', ax=axes[i],
            color=sns.color_palette()[i],
            boxprops=dict(alpha=.5))
        sns.kdeplot(data=value, fill='.1', bw_adjust=1.2, ax=axes[-1])
    axes[-1].legend(labels=data.keys())
    if title:
        fig.suptitle(title)
    return fig


def main():
    # join records
    big_table = {}
    for record in DB.reg.records():
        big_table[record[0]] = {'registration': record[:-6]}
    for record in DB.exp1.records():
        big_table[record[0]]['exp1'] = record[1:]
    for record in DB.exp2.records():
        big_table[record[0]]['exp2'] = record[1:]
    for record in DB.exp3.records():
        big_table[record[0]]['exp3'] = record[1:]

    lines = []
    for record in big_table.values():
        line = record['registration']
        line += record.get('exp1', ('', ''))
        line += record.get('exp2', ('', ''))
        line += record.get('exp3', ('', ''))
        lines.append(line)

    # filter invalid results
    cleaned = []
    for line in lines:
        sid, gender, age, g1, e1, g2, e2, g3, e3 = line
        # age > 12
        if int(age) <= 12:
            continue
        # at least one experiment is not default
        if (g1 == '' or e1 == 0.5) and (g2 == '' or e2 == 0.5) and (g3 == '' or e3 == 0.5):
            continue
        if e2 != '' and e2 >= 0.5:
            continue
        cleaned.append(line)

    # divide into groups
    exp1 = {0: [], 1: [], 2: []}
    exp2 = {0: [], 1: []}
    exp3 = {0: [], 1: []}
    ages = {'Male': [], 'Female': []}
    for line in cleaned:
        sid, gender, age, g1, e1, g2, e2, g3, e3 = line
        if g1 != '':
            exp1[g1].append(e1)
        if g2 != '':
            exp2[g2].append(e2)
        if g3 != '':
            exp3[g3].append(e3)
        if gender == 'M':
            ages['Male'].append(age)
        else:
            ages['Female'].append(age)

    # rename group
    exp1['Smiley'] = exp1.pop(0)
    exp1['Coin'] = exp1.pop(1)
    exp1['Sector'] = exp1.pop(2)
    exp2['Button'] = exp2.pop(0)
    exp2['Roll'] = exp2.pop(1)
    exp3['ends of left'] = exp3.pop(0)
    exp3['ends of right'] = exp3.pop(1)

    # draw graph
    plot_age(ages, 'Participants')
    plt.savefig('./data/participants.png', dpi=200)
    plt.show()

    plot_distribution(exp1, 'Experiment 1')
    plt.savefig('./data/exp1.png', dpi=200)
    plt.show()
    plot_distribution(exp2, 'Experiment 2')
    plt.savefig('./data/exp2.png', dpi=200)
    plt.show()
    plot_distribution(exp3, 'Experiment 3')
    plt.savefig('./data/exp3.png', dpi=200)
    plt.show()


if __name__ == '__main__':
    main()
