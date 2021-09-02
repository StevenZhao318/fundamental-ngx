import { BaseStrategy } from './base-strategy';
import { TimelineNodePosition } from '../../types';
import { TimelineNodeComponent } from '../../components/timeline-node/timeline-node.component';

export class VerticalLeftSideStrategy extends BaseStrategy {

    getCoords(): TimelineNodePosition {
        return undefined;
    }

    calculatePosition(nodes: TimelineNodeComponent[]): void {
        nodes.forEach(node => {
            const el = node.el.nativeElement;
            const dotPosition = el.offsetTop + this.arrowOffset;
            node.lastLine.nativeElement.style.height = el.offsetHeight + el.offsetTop - dotPosition + 'px';
            el.classList.add('fd-timeline__node-wrapper--left');
        })
    }
}
