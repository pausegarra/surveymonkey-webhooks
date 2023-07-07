import { webhookService } from '@/services/WebhookService';
import { Link } from '@/components/Link';
import Heading from '@/components/Heading';
import DeleteButton from '@/components/DeleteWebhookButton';

export default async function Home () {
  const webhooks = await webhookService.getAll();

  return (
    <main>
      <Heading subTitle='List of webhooks'>
        <Link href="/webhooks/create" className='self-center'>Add webhook</Link>
      </Heading>

      <table className="min-w-full bg-black">
        <thead>
          <tr>
            <th className="py-3 px-4 bg-gray-800 font-bold text-sm text-primary uppercase">ID</th>
            <th className="py-3 px-4 bg-gray-800 font-bold text-sm text-primary uppercase">Title</th>
            <th className="py-3 px-4 bg-gray-800 font-bold text-sm text-primary uppercase"></th>
          </tr>
        </thead>
        <tbody>
          {webhooks.data.map((webhook: Omit<Webhook, 'event_type' | 'subscription_url' | 'object_type' | 'object_ids'>) => (
            <tr key={webhook.id} className="hover:bg-gray-900 border-b border-gray-700">
              <td className="py-4 px-6 border-b border-gray-700 text-primary">{webhook.id}</td>
              <td className="py-4 px-6 border-b border-gray-700 text-primary">{webhook.name}</td>
              <td className="py-4 px-6 border-b border-gray-700 text-primary flex gap-2 justify-end items-center">
                <Link href={`/webhooks/${webhook.id}`}>Edit</Link>
                <DeleteButton id={webhook.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="flex justify-center mt-4">
        <button
          key={1}
          className={`mx-1 px-3 py-1 rounded-full bg-primary text-secondary border border-primary`}
        >
          1
        </button>
        <button
          key={2}
          className={`mx-1 px-3 py-1 rounded-full border border-primary text-primary`}
        >
          2
        </button>
        <button
          key={3}
          className={`mx-1 px-3 py-1 rounded-full border border-primary text-primary`}
        >
          3
        </button>
      </div> */}
    </main>
  );
}
