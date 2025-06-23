export interface ResourceInterface {
	id: string;
	title: string;
	type: 'book' | 'video' | 'article' | 'repository' | 'course';
	link: string;
	description?: string;
	tags?: string[];
	createdAt: string;
}