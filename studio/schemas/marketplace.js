export default{
    name: 'marketItems',
        title: 'Market Items',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
          {
            name: 'contractAddress',
            title: 'Contract Address',
            type: 'string',
          },
          {
            name: 'description',
            title: 'Description',
            type: 'string',
          },
          {
            name: 'createdBy',
            title: 'Created By',
            type: 'reference',
            to: [{ type: 'users' }],
          },
          {
            name: 'volumeTraded',
            title: 'Volume Traded',
            type: 'number',
          },
          {
            name: 'floorPrice',
            title: 'Floor Price',
            type: 'number',
          },
          {
            name: 'owners',
            title: 'Owners',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'users' }] }],
          },
          {
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
          },
          {
            name: 'bannerImage',
            title: 'Banner Image',
            type: 'image',
          },
        ],
}